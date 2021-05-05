import { GetStaticProps } from "next";
import Link from "next/link";
import { format, parseISO } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { api } from "../services/api";

import styles from "../styles/home.module.scss";

type User = {
  id: string;
  name: string;
  email: string;
  username: string;
  publishedAt: string;
};

type HomeProps = {
  // latestUsers: User[];
  allUsers: User[];
};

export default function Home({ allUsers }: HomeProps) {
  return (
    <div className={styles.homepage}>
      <section className={styles.latestUsers}>
        <h2>Lista de usuários</h2>
        <ul>
          {allUsers.map((user) => {
            return (
              <li key={user.id}>
                <img src="user.svg" alt="usuario" />

                <div className={styles.usersDetails}>
                  <Link href={`/users/${user.id}`}>
                    <a>{user.name}</a>
                  </Link>
                  <p>
                    <strong>Username:</strong> {user.username}
                  </p>
                  <span>
                    <strong>Email: </strong>
                    {user.email}
                  </span>
                  <span>
                    <strong>Date:</strong>
                    {user.publishedAt}
                  </span>
                </div>
               
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get("users", {
    params: {
      _limit: 12,
      _sort: "published_at",
      _order: "desc",
    },
  });

  const users = data.map((user) => {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      username: user.username,
      address: user.address.street,
      description: user.description,
      suite: user.address.suite,
      city: user.address.city,
      publishedAt: format(parseISO(user.published_at), "d MMM yy", {
        locale: ptBR,
      }),
    };
  });

  const allUsers = users.slice(0, users.length);

  return {
    props: {
      allUsers,
    },
    revalidate: 60 * 60 * 8,
  };
};

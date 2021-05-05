import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import { format, parseISO } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

import { useRouter } from "next/router";
import { api } from "../../services/api";

import styles from "./user.module.scss";

type User = {
  id: string;
  name: string;
  email: string;
  username: string;
  address: string;
  suite: string;
  city: string;
  publishedAt: string;
  description: string;
};

type UserProps = {
  user: User;
};

export default function User({ user }: UserProps) {
  const router = useRouter();

  return (
    <div className={styles.user}>
      <div className={styles.perfil}>
        <Image src="/photos.svg" alt="Image" width={120} height={120} />
        <div>
          <h2>{user.name}</h2>
          <span>{user.email}</span>
          <ul>
            <li>
              {" "}
              <strong>Endereço: </strong> {user.address}{" "}
            </li>
            <li>
              {" "}
              <strong>Número: </strong> {user.suite}
            </li>
            <li>
              {" "}
              <strong>Cidade: </strong> {user.city}
            </li>
            <li>
              {" "}
              <strong>Data da conta: </strong> {user.publishedAt}
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.info}>
        <div>
          <strong>Description</strong>
          <p>{user.description}</p>
        </div>
      </div>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { slug } = ctx.params;

  const { data } = await api.get(`/users/${slug}`);

  const user = {
    id: data.id,
    name: data.name,
    email: data.email,
    username: data.username,
    description: data.description,
    address: data.address.street,
    suite: data.address.suite,
    city: data.address.city,
    publishedAt: format(parseISO(data.published_at), "d MMM yy", {
      locale: ptBR,
    }),
  };

  return {
    props: {
      user,
    },
    revalidate: 60 * 60 * 24,
  };
};

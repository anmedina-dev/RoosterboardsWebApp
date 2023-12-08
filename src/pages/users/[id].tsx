import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import styles from "../../styles/Profile.module.css";
import { Session } from "next-auth";
import Button from "~/components/Button";
import { useRouter } from "next/navigation";

type LoggedInPageProps = {
  sessionData: Session;
};

function LoggedInPage({ sessionData }: LoggedInPageProps) {
  return (
    <article className={`container mx-auto ${styles.loggedInPage}`}>
      <section className={styles.imageSection}>
        <Image
          src={sessionData.user.image as string}
          height={100}
          width={100}
          className={styles.loggedInImage}
          alt="profile-image"
        />
      </section>
      <section className={styles.profileInfoSection}>
        <h1>{sessionData.user.name}</h1>
        <h3>{sessionData.user.email}</h3>
      </section>
      <section className={styles.buttonSection}>
        <Button onClick={() => signOut()} content="Sign Out" />
      </section>
    </article>
  );
}

function NotLoggedInPage() {
  return (
    <article className="flex justify-center">
      <span className="loading loading-spinner loading-lg"></span>
    </article>
  );
}

export default function Profile() {
  const router = useRouter();
  const { data: sessionData } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/");
    },
  });

  if (!sessionData) return <NotLoggedInPage />;
  return <LoggedInPage sessionData={sessionData} />;
}

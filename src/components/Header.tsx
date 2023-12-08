import React from "react";
import { signIn, useSession } from "next-auth/react";
import { Navbar, Container, Nav } from "react-bootstrap";
import styles from "../styles/Header.module.css";
import Image from "next/image";
import useWindowSize from "~/hooks/WindowHook";
import HeaderCart from "./HeaderCart";

export default function Header() {
  const size = useWindowSize();
  const { data: sessionData } = useSession();
  const isDesktop = size.width !== undefined ? size.width > 990 : false;

  return (
    <div className={isDesktop ? `pt-16` : ``}>
      <Navbar collapseOnSelect expand="lg" variant="dark" sticky="top">
        <Container className={styles.headerContainer}>
          {isDesktop ? (
            <Nav.Link href="/" className="flex justify-center">
              <Image
                className={styles.headerImage}
                src="/assets/Logo.png"
                alt="logo"
                height={80}
                width={80}
              />
            </Nav.Link>
          ) : (
            <Nav.Link className="rbNav.Link" href="/">
              <Navbar.Brand className={styles.headerLink}>
                Roosterboards
              </Navbar.Brand>
            </Nav.Link>
          )}

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse
            id="responsive-navbar-nav"
            className={`justify-content-lg-between`}
          >
            <Nav className="me-auto">
              <Nav.Link href="/AboutUs">
                <div className={styles.eggLink}>
                  <div className={styles.egg}></div>
                  <div className={styles.LinkClass}>About Us</div>
                </div>
              </Nav.Link>
              <Nav.Link className={styles.navEgg} href="/Catalog">
                <div className={styles.eggLink}>
                  <div className={styles.egg}></div>
                  <div className={styles.LinkClass}>Products</div>
                </div>
              </Nav.Link>
              {isDesktop && (
                <Nav.Link className={styles.navEgg} href="/TestKeeb">
                  <div className={styles.eggLink}>
                    <div className={styles.egg}></div>
                    <div className="Nav.Link-class">Test</div>
                  </div>
                </Nav.Link>
              )}
            </Nav>
            <Nav>
              {isDesktop ? (
                <>
                  {sessionData ? (
                    <Nav.Link href={`/users/${sessionData?.user.id}`}>
                      <Image
                        src={sessionData.user.image as string}
                        alt="Basket"
                        className={`${styles.iconClass} ${styles.profileImage}`}
                        height={30}
                        width={30}
                      />
                    </Nav.Link>
                  ) : (
                    <Nav.Link onClick={() => signIn()}>
                      <Image
                        src="/assets/user.png"
                        alt="Basket"
                        className={`${styles.iconClass} ${styles.profileImage}`}
                        height={30}
                        width={30}
                      />
                    </Nav.Link>
                  )}
                </>
              ) : (
                <>
                  {sessionData ? (
                    <Nav.Link href={`/users/${sessionData?.user.id}`}>
                      <div className={styles.LinkClass}>Profile</div>
                    </Nav.Link>
                  ) : (
                    <Nav.Link onClick={() => signIn()}>
                      <div className={styles.LinkClass}>Profile</div>
                    </Nav.Link>
                  )}
                </>
              )}

              <Nav.Link href="/Cart">
                {sessionData !== undefined && sessionData !== null ? (
                  <HeaderCart isDesktop={isDesktop} sessionData={sessionData} />
                ) : (
                  <>
                    {isDesktop ? (
                      <Image
                        src="/assets/add-to-basket.png"
                        alt="Basket"
                        className={`${styles.iconClass} ${styles.basketIcon}`}
                        height={30}
                        width={30}
                      />
                    ) : (
                      <div className={styles.LinkClass}>Cart</div>
                    )}
                  </>
                )}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

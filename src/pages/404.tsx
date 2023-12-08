import React from "react";
import styles from "../styles/NotFound.module.css";
import Image from "next/image";

function NotFound() {
	return (
		<div className={styles.notFoundPage}>
			<header className={styles.notFoundHeader}>
				<Image
					src={"/assets/Logo.png"}
					className={styles.appLogo}
					alt="logo"
					height={800}
					width={500}
				/>
				<h2 className="mt-5">404 Page Not Found</h2>
			</header>
		</div>
	);
}

export default NotFound;

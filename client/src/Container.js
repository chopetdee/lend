import Head from "next/head";
import Link from "next/link";

export default function Container({ children, currentPage }) {
  return (
    <div className="fullPage">
      <div className="topnav">
        <Link key={"transactions"} href="/">
          <a href="" className={`choice ${currentPage === "transactions" && "active"}`}>
            Transactions
          </a>
        </Link>
        <Link key={"user"} href="/user/">
          <a href="" className={`choice ${currentPage === "user" && "active"}`}>Users</a>
        </Link>
        <Link key={"balance"} href="/balance">
          <a href="" className={`choice ${currentPage === "balance" && "active"}`}>
            Balance
          </a>
        </Link>
      </div>
      <div className="container">
        <Head>
          <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>{children}</main>
      </div>
      <style jsx>{`
        .fullPage {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }
        .container {
          height: 100%;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .topnav {
          width: 100%;
          overflow: hidden;
          background-color: #333;
        }

        .topnav .choice {
          float: left;
          color: #f2f2f2;
          text-align: center;
          padding: 14px 16px;
          text-decoration: none;
          font-size: 17px;
        }
        .choice:hover {
          background-color: #aaa;
          color: black;
        }
        .choice.active {
          background-color: #04aa6d;
          color: white;
        }
      `}</style>
      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
        .noDecor {
          text-decoration: none;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}

import React from 'react'
import styles from "./NotFound.module.scss"
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className={styles["not-found"]}>
        <div>
            <h2>404</h2>
            <p><b>oppppsss, page not found</b></p>
            <button className="--btn --btn-danger">
                <Link to="/">
                &larr; Back To home
                </Link>
                </button>
        </div>
    </div>
  )
}

export default NotFound
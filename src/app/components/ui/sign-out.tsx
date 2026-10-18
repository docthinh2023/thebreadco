'use client'
import {logout} from "../../actions/log-out";

export const Signout = () => {
    return(
      <button className="md:w-25 text-primary md:text-muted hover:text-fg-primary md:hover:text-primary duration-500 ease-in-out" onClick={() => logout()}>Sign out</button>
    )
}
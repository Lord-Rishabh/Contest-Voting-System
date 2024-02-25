import React from "react";
import { Link } from "react-router-dom";

export default function Products() {
    return (
        <div>
            <h1>this is products page..</h1>
            <Link to="/" className="underline"> go to dashboard </Link>
        </div>
    )    
}

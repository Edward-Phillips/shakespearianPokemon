import React from "react";
import Link from "next/link";

export default function Navbar({ navbar }) {
  return (
    <div style={{ display: navbar.display ?? "block" }}>
      <p
        style={{
          gridArea: "text",
          backgroundColor: "black",
          color: "#00e1ff",
          textAlign: "center",
          border: "2px solid lightgrey",
        }}
      >
        {navbar.title}
      </p>
      <Link href={navbar.href}>
        <a style={{ gridArea: "button", placeSelf: "center" }}>></a>
      </Link>
    </div>
  );
}

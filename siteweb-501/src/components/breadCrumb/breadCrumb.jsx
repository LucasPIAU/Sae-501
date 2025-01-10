import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { BreadcrumbContext } from "../../App";
import style from './breadCrumb.module.css';

const BreadCrumb = () => {
  const { breadcrumbs } = useContext(BreadcrumbContext);

  return (
    <nav>
      {breadcrumbs.map((crumb, index) => (
        <span key={crumb.path}>
          {index > 0 && " > "}
          <Link to={crumb.path}>{crumb.label}</Link>
        </span>
      ))}
    </nav>
  );
};

export default BreadCrumb;
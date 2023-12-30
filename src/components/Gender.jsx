import React from "react";
import { CgGenderFemale, CgGenderMale } from "react-icons/cg";
import { MdOutlineTransgender } from "react-icons/md";
import { FaGenderless } from "react-icons/fa";

const Gender = ({ gender }) => {
  switch (gender) {
    case "Male":
      return <CgGenderMale />;
      break;

    case "Female":
      return <CgGenderFemale />;
      break;

    case "Transgender":
      return <MdOutlineTransgender />;
      break;

    case "Other":
      return <FaGenderless />;
      break;

    default:
      break;
  }
};

export default Gender;

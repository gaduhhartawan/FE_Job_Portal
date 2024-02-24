import React from "react";
import { format, formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";

const Card = ({ data }) => {
  const parts = data?.jobLocation.split(",");

  // Location if parts array more than 1 element take the 2nd element
  let location;
  if (parts.length > 1) {
    location = parts[1].trim();
  } else {
    location = parts[0].trim();
  }

  // const date = format(new Date(data?.createdAt), "dd-MM-yyyy");

  // Img name
  const fullname = data.companyName.split(" ").join("+");
  
  // date
  const date = new Date(data?.createdAt);
  const formattedDate = formatDistanceToNow(date, { addSuffix: true });

  return (
    <Link
      to={`/jobs/${data._id}`}
      className="flex justify-between items-center p-5 bg-[#EFEFEF] hover:bg-[#DDE2ED] rounded-2xl cursor-pointer"
    >
      {/* user */}
      <div className="flex items-center gap-4">
        <img
          src={`https://ui-avatars.com/api/?name=${fullname}&background=D9D9D9`}
          className="rounded-full"
          alt=""
        />
        <div className="flex flex-col">
          <span>{data.companyName}</span>
          <span className="font-bold">{data.jobTitle}</span>
          <span className="text-gray-500 capitalize">{location} | {data.jobType}</span>
        </div>
      </div>
      {/* time */}
      <span className="capitalize">{formattedDate}</span>
    </Link>
  );
};

export default Card;

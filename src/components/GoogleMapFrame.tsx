import React from "react";

type GoogleMapFrameType = {
  title: string;
  longitude: string;
  latitude: string;
  width: string;
  height: string;
  style?: React.CSSProperties;
};

const GoogleMapFrame: React.FC<GoogleMapFrameType> = ({
  title,
  longitude,
  latitude,
  width,
  height,
  style,
}) => {
  return (
    <iframe
      style={style}
      title={title}
      src={`https://maps.google.com/maps?q=${latitude}, ${longitude}&hl=en&z=14&output=embed`}
      width={width}
      height={height}
    ></iframe>
  );
};

export default GoogleMapFrame;

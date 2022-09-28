import React from "react";

type GoogleMapStaticType = {
  title: string;
  longitude: number;
  latitude: number;
  width: string;
  height: string;
  frameBorder?: string;
  scrolling?: string;
  marginHeight?: number;
  marginWidth?: number;
};

const GoogleMapStatic: React.FC<GoogleMapStaticType> = ({
  title,
  longitude,
  latitude,
  width,
  height,
  frameBorder,
  scrolling,
  marginHeight,
  marginWidth,
}) => {
  return (
    <iframe
      title={title}
      src={`https://maps.google.com/maps?q=${latitude}, ${longitude}&hl=en&z=14&output=embed`}
      width={width}
      height={height}
      frameBorder={frameBorder}
      scrolling={scrolling}
      marginHeight={marginHeight}
      marginWidth={marginWidth}
    ></iframe>
  );
};

export default GoogleMapStatic;

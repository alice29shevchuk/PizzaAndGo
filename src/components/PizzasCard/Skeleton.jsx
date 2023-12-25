import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = (props) => (
  <ContentLoader 
    className="pizza-block"
    speed={2}
    width={280}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="138" cy="138" r="108" /> 
    <rect x="0" y="266" rx="10" ry="10" width="280" height="23" /> 
    <rect x="0" y="305" rx="10" ry="10" width="280" height="88" /> 
    <rect x="0" y="417" rx="10" ry="10" width="95" height="30" /> 
    <rect x="130" y="405" rx="24" ry="24" width="145" height="50" />
  </ContentLoader>
)

export default Skeleton;


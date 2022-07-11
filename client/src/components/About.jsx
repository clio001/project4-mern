import React from "react";
import DocViewer from "react-doc-viewer";

function About() {
  return (
    <div>
      <DocViewer
        documents={[
          {
            uri: "https://americainclass.org/wp-content/uploads/2015/10/nsc68-cover.jpg",
          },
          {
            uri: "https://americainclass.org/wp-content/uploads/2015/10/nsc68-cover.jpg",
          },
        ]}
      />
    </div>
  );
}

export default About;

import React, { useState, useEffect } from "react";
import Editor from "./Editor";
import UseLocalStorage from "../hooks/UseLocalStorage";
import Fullscreen from "fullscreen-react";
// import HtmlIcon from "@mui/icons-material/Html";
// import { Navbar } from "./Navbar";
// import { auth, fs } from "../Config/Config";

function App() {
  const [html, setHtml] = UseLocalStorage("html", "");
  const [css, setCss] = UseLocalStorage("css", "");
  const [javascript, setJavascript] = UseLocalStorage("javascript", "");
  // const [css1, setCss1] = UseLocalStorage("css", "");
  const [srcDoc, setSrcDoc] = useState("");
  const [isEnter, setIsEnter] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <body>${html}</body>
          <style>${css}</style>
          <script>${javascript}</script>
        </html>
      `);
    }, 250);

    return () => clearTimeout(timeout);
  }, [html, css, javascript]);

  return (
    <>
      {/* <Navbar user={user} totalProducts={totalProducts} /> */}
      <div className="error">
        <h1>
          Sorry, but your screen size is too small. Try switching to a screen
          with larger screen size
        </h1>
      </div>

      <div className="norm">
        <div className="pane top-pane">
          <Editor
            language="xml"
            displayName="HTML"
            value={html}
            onChange={setHtml}
          />
          <Editor
            language="css"
            displayName="CSS"
            value={css}
            onChange={setCss}
          />
          {/* <Editor
            language="css"
            displayName="CSS-1"
            value={css1}
            onChange={setCss1}
          /> */}
          <Editor
            language="javascript"
            displayName="Js"
            value={javascript}
            onChange={setJavascript}
          />
        </div>
        <button
          onClick={() => {
            setIsEnter(true);
          }}
          className="fullscreen-toggler"
        >
          Go Fullscreen
        </button>
        <div className="pane">
          <Fullscreen isEnter={isEnter} onChange={setIsEnter}>
            <iframe
              srcDoc={srcDoc}
              title="output"
              sandbox="allow-scripts"
              frameBorder="0"
              width="100%"
              height="100%"
              className="full-screenable-node"
            />
          </Fullscreen>
        </div>
      </div>
    </>
  );
}

export default App;

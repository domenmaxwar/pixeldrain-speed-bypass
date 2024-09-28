import { useEffect, useState } from "react";
import { Box, CircularProgress, Container, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import { Download } from "@mui/icons-material";

function App() {
  const bypassURL = "https://pd.cybar.xyz";
  const [downloadLink, setDownloadLink] = useState("");
  const [url, setUrl] = useState("");

  const [message, setMessage] = useState("");
  const [linkMessage, setLinkMessage] = useState("");

  const handleSpeedBypass = () => {
    setMessage("");
    setLinkMessage("");
    setDownloadLink("");

    const match = url.match(/^https:\/\/pixeldrain\.com\/u\/([a-zA-Z0-9]+)/);

    if (match) {
      const id = match[1];
      setLinkMessage("DOWNLOAD LINK GENERATING");
      setTimeout(() => {
        setLinkMessage("DOWNLOAD LINK GENERATED");
        setDownloadLink(bypassURL + "/" + id);
      }, 2000);
    } else if (url === "") {
      setMessage("URL Is Empty");
    } else {
      setMessage("Please Paste A Valid URL");
    }
  };
  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
      document
        .getElementById("filled-basic-label")
        .setAttribute("data-shrink", "true");
    } catch (err) {
      console.error("Failed to read clipboard contents: ", err);
    }
  };

  useEffect(() => {
    let checkStatus = true;

    const detectDevTools = () => {
      if (checkStatus) return;

      const style =
        "background-color: red; color: white; font-size: 1rem; padding: 0.5rem";
      console.log("%cJust Close Developer Tools🤪", style);
      debugger;
      setTimeout(detectDevTools, 100);
    };
    detectDevTools();

    return () => {
      checkStatus = true;
    };
  }, []);

  return (
    <>
      <section className="w-screen h-screen flex items-center">
        <Container className="space-y-4" maxWidth="sm">
          <Box>
            <h1 className="text-2xl xs:text-3xl sm:text-4xl font-semibold text-gray-800">
              SpeedDrain: Lightning-Fast Pixeldrain Downloads
            </h1>
            <p className="text-lg font-normal text-gray-500">
              Bypass Pixeldrain download speed limits with SpeedDrain. Enjoy
              faster, hassle-free downloads in just a few clicks!
            </p>
          </Box>
          {message && (
            <p className="bg-red-600 text-white p-1 font-semibold text-center my-2 rounded">
              {message}
            </p>
          )}

          <Box className="flex flex-col sm:flex-row gap-2 justify-center">
            <Box className="sm:flex-1 relative">
              <TextField
                className="w-full"
                id="filled-basic"
                type="url"
                label="URL"
                variant="filled"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
              <ContentPasteIcon
                onClick={handlePaste}
                className="absolute right-5 translate-y-[50%] z-50 cursor-pointer transition-all active:scale-95"
              />
            </Box>

            <Button
              onClick={handleSpeedBypass}
              className="!capitalize"
              variant="contained"
              color="secondary"
            >
              Bypass Speeds
            </Button>
          </Box>
          <Box className="text-center">
            {linkMessage && (
              <p className="bg-green-400 p-1 rounded my-2 flex items-center justify-center gap-2 font-semibold">
                {!downloadLink && (
                  <CircularProgress
                    variant="indeterminate"
                    className="!text-black !w-5 !h-5"
                  />
                )}
                {linkMessage}
              </p>
            )}
            {downloadLink && (
              <Button variant="outlined" startIcon={<Download />}>
                <a
                  href={downloadLink}
                  className="!no-underline"
                  target="_blank"
                >
                  Download
                </a>
              </Button>
            )}
          </Box>
        </Container>
      </section>
    </>
  );
}

export default App;

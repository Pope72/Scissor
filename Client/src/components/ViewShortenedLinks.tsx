import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import BlueButton from "./BlueButton";
import { useState } from "react";
import AllInfos from "./AllInfos";
import { useAllUserLinks, useUserLinks } from "@/store/useUserStore";
import QRCode from "qrcode.react";

interface ViewAccountLinksProps {
  open: boolean;
  setOpenChange: (e: boolean) => void;
}
type TruncateText = (text: string, limit: number) => string;
const truncateText: TruncateText = (text, limit) => {
  if (text.length > limit) {
    return text.substring(0, limit) + "...";
  }
  return text;
};

const ViewAccountLinks = ({ open, setOpenChange }: ViewAccountLinksProps) => {
  const {
    setOriginalLink,
    setShortenedLink,
    setQrCode,
    setQrCodeIndex,
    setClicks,
  } = useUserLinks();
  const { allMyLinks } = useAllUserLinks();

  const [modal, setModal] = useState(false);
  const [header, setHeader] = useState("");

  return (
    <>
      <Dialog open={open} onOpenChange={setOpenChange}>
        <DialogContent className="  bg-gradient-to-tr from-[#1B6830] to-black opacity-100 text-white shadow-2xl">
          <DialogTitle>Your Shortened Links</DialogTitle>
          <div className="mt-4">
            {allMyLinks?.length > 0 ? (
              <table className="w-full text-left">
                <thead>
                  <tr>
                    <th className="py-2">Original Link</th>
                    <th className="py-2 hidden lg:visible">Shortened Link</th>
                    <th className="py-2 hidden md:visible">QR Code</th>
                    <th className="py-2 hidden md:visible">Clicks</th>
                  </tr>
                </thead>
                <tbody>
                  {allMyLinks?.map((link, index) => (
                    <tr key={index} className="border-t border-gray-700">
                      <td className="py-2 flex justify-between">
                        {truncateText(link.originalLink, 25)}{" "}
                        <BlueButton
                          buttonText={
                            <img src="/icons/arrow-right.svg" alt="arrow" />
                          }
                          handleClick={() => {
                            setHeader(`Shortened Link ${index + 1}`);
                            setOriginalLink(link.originalLink);
                            setShortenedLink(
                              `https://scissor-eight.vercel.app/${link.shortenedLink}`
                            );
                            setQrCode(link.qrCodeUrl);
                            setQrCodeIndex(index.toString());
                            setClicks(link.clicks);
                            setModal(true);
                          }}
                          className="px-3 py-2 rounded-full"
                          type="button"
                        />
                      </td>
                      <td className="py-2 hidden md:visible">
                        <a
                          href={link.shortenedLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline"
                        >
                          {link.shortenedLink}
                        </a>
                      </td>
                      <td className="py-2 px-4 hidden md:visible">
                        <QRCode
                          id={`QRCode-${index}`}
                          value={link.qrCodeUrl || ""}
                        />
                      </td>
                      <td className="py-2 px-4 hidden md:visible">
                        {link?.clicks.length > 0 ? (
                          link?.clicks.map((click, idx) => (
                            <div key={idx}>
                              <p>
                                {click.count} clicks from {click.country}
                              </p>
                            </div>
                          ))
                        ) : (
                          <p>No click data available</p>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No shortened links available.</p>
            )}
          </div>
        </DialogContent>
      </Dialog>
      <AllInfos
        handleChange={(e: boolean) => setModal(e)}
        header={header}
        opens={modal}
      />
    </>
  );
};

export default ViewAccountLinks;

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useUserLinks } from "@/store/useUserStore";
import QRCode from "qrcode.react";
import BlueButton from "./BlueButton";
import { Link } from "react-router-dom";


const Tables = () => {
  const { originalLink, shortenedLink, qrCode, qrCodeIndex, clicks } =
    useUserLinks();
  const downloadQRCode = (shortenedLink: string, id: string) => {
    // Get the canvas element
    const canvas = document.getElementById(id) as HTMLCanvasElement | null;

    if (!canvas) {
      console.error("Canvas element not found");
      return;
    }

    // Convert canvas to data URL in PNG format
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");

    // Create an anchor element for download
    const downloadLink = document.createElement("a") as HTMLAnchorElement;
    downloadLink.href = pngUrl;
    downloadLink.download = `${shortenedLink}.png`;

    // Append to the document body, trigger the download, and then remove the element
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <Table>
      <TableCaption>Shortened link details</TableCaption>

      <TableBody>
        <TableRow>
          <TableCell className="font-medium">Original link</TableCell>
          <TableCell>{originalLink}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Shortened Link</TableCell>
          <TableCell>
          <Link to={shortenedLink}>{shortenedLink}</Link>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">QR Code</TableCell>
          <TableCell>
            <QRCode id={qrCodeIndex} value={qrCode} />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Download QRCode</TableCell>
          <TableCell>
            <BlueButton
              buttonText="Download"
              handleClick={() => downloadQRCode(shortenedLink, qrCodeIndex)}
              className="py-3 px-4"
              type="button"
            />
          </TableCell>
        </TableRow>
        {/* Clicks and Country Headers */}
        <TableHeader>
          <TableRow>
            <TableCell className="font-medium">Clicks</TableCell>
            <TableCell className="font-medium">Country</TableCell>
          </TableRow>
        </TableHeader>

        {/* Clicks Data */}
        {clicks?.map((click, index) => (
          <TableRow key={index}>
            <TableCell>{click.count}</TableCell>
            <TableCell>{click.country}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default Tables;

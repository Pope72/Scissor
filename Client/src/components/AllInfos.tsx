import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import Tables from "./Table";
interface AllInfos {
  opens: boolean;
  header: string;
  handleChange: (e: boolean) => void;
}
const AllInfos = ({ opens, header, handleChange }: AllInfos) => {
  return (
    <Dialog open={opens} onOpenChange={handleChange}>
      <DialogContent className=" bg-[#0B101B] opacity-100 text-white shadow-2xl">
        <DialogTitle>{header}</DialogTitle>
        <Tables />
      </DialogContent>
    </Dialog>
  );
};
export default AllInfos;

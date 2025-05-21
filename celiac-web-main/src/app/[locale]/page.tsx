import { useTranslations } from "next-intl";
import MiddleHome from "../../components/MiddleHome/MiddleHome";
export default function Home() {
  const t = useTranslations("Index");
  return (
    <>
      <MiddleHome />
    </>
  );
}

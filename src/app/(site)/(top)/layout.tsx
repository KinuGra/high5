import Footer from "@/components/footer";
import Header from "@/components/header";
import { Provider } from "@/components/ui/provider";
import { FC } from "react";

interface TopLayoutProps {
  children?: React.ReactNode;
}

const TopLayout: FC = ({ children }: TopLayoutProps) => {
  return (
    <Provider>
      <Header />
      {children}
      <Footer />
    </Provider>
  );
};

export default TopLayout;

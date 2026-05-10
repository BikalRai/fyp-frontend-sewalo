import SeContainer from "../container/SeContainer";
import SeContainerPadding from "../container/SeContainerPadding";
import SeFooterSocials from "./SeFooterSocials";

const SeFooter = () => {
  return (
    <SeContainer>
      <SeContainerPadding>
        <div className="text-light grid md:grid-cols-2 lg:grid-cols-4 gap-10 py-20">
          <SeFooterSocials />
          <div>PLATFORM</div>
          <div>FOR PROVIDERS</div>
          <div>COMPANY</div>
        </div>
      </SeContainerPadding>
    </SeContainer>
  );
};

export default SeFooter;

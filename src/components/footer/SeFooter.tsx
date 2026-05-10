import SeContainer from "../container/SeContainer";
import SeContainerPadding from "../container/SeContainerPadding";
import SeFooterCompany from "./SeFooterCompany";
import SeFooterPlatform from "./SeFooterPlatform";
import SeFooterProviders from "./SeFooterProviders";
import SeFooterSocials from "./SeFooterSocials";

const SeFooter = () => {
  return (
    <SeContainer>
      <SeContainerPadding>
        <div className="py-20">
          <div className="text-light grid md:grid-cols-2 lg:grid-cols-4 gap-10">
            <SeFooterSocials />
            <SeFooterPlatform />
            <SeFooterProviders />
            <SeFooterCompany />
          </div>

          <div className="border-t border-t-muted mt-14 py-7 flex items-center justify-between">
            <div className="text-muted text-xs leading-4 flex items-center gap-2">
              <span>© 2026 Sewalo. Built in Nepal</span>
              <img
                src="https://flagcdn.com/np.svg"
                alt="Nepal"
                className="h-3"
              ></img>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-xs text-muted">Payments via</div>
              <a
                href=""
                className="py-1 px-3 border border-muted rounded-sm text-light/70 hover:border-light/70 transition-colors duration-300"
              >
                eSewa
              </a>
              <a
                href=""
                className="py-1 px-3 border border-muted rounded-sm text-light/70 hover:border-light/70 transition-colors duration-300"
              >
                Khalti
              </a>
            </div>
          </div>
        </div>
      </SeContainerPadding>
    </SeContainer>
  );
};

export default SeFooter;

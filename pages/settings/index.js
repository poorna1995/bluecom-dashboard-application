import BasicTabs from "components/Common/Tabs/BasicTabs";
import DrawerLayout from "layouts/DrawerLayout";
import React from "react";
import MerchantOnboardingSection from "sections/OnboardingSections/MerchantOnboardingSection";
import SettingsPageSection from "sections/SettingPageSection";
import ThirdPartyAppsPageSections from "sections/ThirdPartyAppsPageSections";

export default function SettingsPage() {
    return (
        <DrawerLayout>
            {/* <BasicTabs
        data={[
          {
            label: "Third party apps",
            component: <ThirdPartyAppsPageSections />,
          },
          {
            label: "Profile",
            component: <MerchantOnboardingSection />,
          },
        ]}
      /> */}
         <SettingsPageSection /> 
            {/* <Grid container>
				<Grid item md={3}>
					<BaseCard sx={{ padding: "16px" }}>
						<SectionTitleText>
							Connect third party apps
						</SectionTitleText>
						<DescriptionText>
							Connect third party apps to your account to sync
							data
						</DescriptionText>
						<AppLink href="/third-party-apps">
							Go to third party integration
						</AppLink>
					</BaseCard>
				</Grid>
			</Grid> */}
        </DrawerLayout>
    );
}

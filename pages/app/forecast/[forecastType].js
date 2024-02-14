import DrawerLayout from "layouts/DrawerLayout";
import { useRouter } from "next/router";
import React from "react";
import BlankLevelForecastPageSections from "sections/ForecastPageSections/BlankLevelForecastPageSections";
import ComponentLevelForecastPageSections from "sections/ForecastPageSections/ComponentLevelForecastPageSections";
import OpenToBuyForecastPageSections from "sections/ForecastPageSections/OpenToBuyForecastPageSections";

const routeData = {
  blank: {
    component: BlankLevelForecastPageSections,
  },
  component: {
    component: ComponentLevelForecastPageSections,
  },
  "open-to-buy": {
    component: OpenToBuyForecastPageSections,
  },
};
export default function ForecastTypePage() {
  const router = useRouter();
  const { forecastType } = router.query;
  const MyComponent = forecastType && routeData[forecastType].component;
  return <DrawerLayout>{forecastType && <MyComponent />}</DrawerLayout>;
}

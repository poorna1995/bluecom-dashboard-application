import DrawerLayout from "layouts/DrawerLayout";
import React from "react";
import JobDetailsPageSection from "sections/JobsPageSections/JobDetailsPageSection";

export default function JobDetailsPage() {
  return (
    <DrawerLayout px="0">
      <JobDetailsPageSection />
    </DrawerLayout>
  );
}

import DrawerLayout from "layouts/DrawerLayout";
import React from "react";
import JobsPageSections from "sections/JobsPageSections";

export default function JobsPage() {
  return (
    <DrawerLayout>
      <JobsPageSections />
    </DrawerLayout>
  );
}

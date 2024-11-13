import "@yext/visual-editor/style.css";
import {
  Template,
  GetPath,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
  GetHeadConfig,
  HeadConfig,
} from "@yext/pages";
import { Config, Render } from "@measured/puck";
import { locationConfig } from "../ve.config";
import {
  resolveVisualEditorData,
  applyTheme,
  DocumentProvider,
} from "@yext/visual-editor";
import { themeConfig } from "../../theme.config";

export const config = {
  name: "location",
  stream: {
    $id: "location-stream",
    filter: {
      entityTypes: ["location"],
    },
    fields: [
      "id",
      "uid",
      "meta",
      "slug",
      "visualConfigurations",
      "pageLayouts.visualConfiguration",
      "name",
      "hours",
      "address",
      "yextDisplayCoordinate",
      "c_productSection.sectionTitle",
      "c_productSection.linkedProducts.name",
      "c_productSection.linkedProducts.c_productPromo",
      "c_productSection.linkedProducts.c_description",
      "c_productSection.linkedProducts.c_coverPhoto",
      "c_productSection.linkedProducts.c_productCTA",
      "c_hero",
      "c_faqSection.linkedFAQs.question",
      "c_faqSection.linkedFAQs.answerV2",
      "additionalHoursText",
      "mainPhone",
      "emails",
      "services",
      "c_deliveryPromo",
    ],
    localization: {
      locales: ["en"],
    },
  },
  additionalProperties: {
    isVETemplate: true,
  },
} as const satisfies TemplateConfig;

export const transformProps = async (data: any) => {
  return resolveVisualEditorData(data, "location");
};

const h = `<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet">`;

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  document,
}): HeadConfig => {
  return {
    title: document.name,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    tags: [
      {
        type: "link",
        attributes: {
          rel: "icon",
          type: "image/x-icon",
        },
      },
    ],
    other: applyTheme(document, themeConfig, h),
  };
};

export const getPath: GetPath<TemplateProps> = ({ document }) => {
  return document.slug
    ? document.slug
    : `${document.locale}/${document.address.region}/${document.address.city}/${
        document.address.line1
      }-${document.id.toString()}`;
};

const Location: Template<TemplateRenderProps> = ({ document }) => {
  const { visualTemplate } = document;
  return (
    <DocumentProvider value={document}>
      <Render config={locationConfig as Config} data={visualTemplate} />
    </DocumentProvider>
  );
};

export default Location;

import {
  applyTheme,
  Editor,
  EntityFieldsProvider,
  usePlatformBridgeDocument,
  usePlatformBridgeEntityFields,
  DocumentProvider,
} from "@yext/visual-editor";
import { componentRegistry } from "../ve.config";
import {
  GetPath,
  TemplateProps,
  TemplateConfig,
  HeadConfig,
  TemplateRenderProps,
  GetHeadConfig,
} from "@yext/pages";
import { themeConfig } from "../../theme.config";

// Editor is avaliable at /edit
export const getPath: GetPath<TemplateProps> = () => {
  return `edit`;
};

export const config: TemplateConfig = {
  name: "edit",
};

const h = `<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Sour+Gummy:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">`;

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  document,
}): HeadConfig => {
  return {
    other: applyTheme(document, themeConfig, h),
  };
};

// Render the editor
const Edit: () => JSX.Element = () => {
  const entityDocument = usePlatformBridgeDocument();
  const entityFields = usePlatformBridgeEntityFields();

  return (
    <DocumentProvider value={entityDocument}>
      <EntityFieldsProvider entityFields={entityFields}>
        <Editor
          document={entityDocument}
          componentRegistry={componentRegistry}
          themeConfig={themeConfig}
        />
      </EntityFieldsProvider>
    </DocumentProvider>
  );
};

export default Edit;

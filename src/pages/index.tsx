import FileDropzone from "@/conponents/FileDropzone";
import { ICloudinaryFileObject } from "@/models/cloudinary.model";
import {
  Button,
  Container,
  CopyButton,
  Image,
  Input,
  Space,
  Title,
} from "@mantine/core";
import { useSetState } from "@mantine/hooks";
import { FilePondFile } from "filepond";

const HomePage = () => {
  const [state, setState] = useSetState<{
    asset: ICloudinaryFileObject | null;
  }>({
    asset: null,
  });

  return (
    <Container size={"sm"}>
      <Title order={3} my={"lg"}>
        File Uploader App
      </Title>
      <FileDropzone
        onFileUpload={(asset) => {
          setState({ asset });
        }}
        onFileRemove={() => {
          setState({ asset: null });
        }}
      />

      {state.asset && (
        <>
          <Input
            defaultValue={state.asset?.secure_url}
            rightSection={
              <CopyButton value={state.asset?.secure_url!}>
                {({ copied, copy }) => (
                  <Button
                    compact
                    color={copied ? "teal" : "blue"}
                    onClick={copy}
                  >
                    {copied ? "Copied url" : "Copy url"}
                  </Button>
                )}
              </CopyButton>
            }
            rightSectionWidth={85}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                height={12}
                width={12}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
                />
              </svg>
            }
            placeholder="Your email"
          />

          <Space h={"md"} />
          <Image
            radius="md"
            src={state.asset.secure_url}
            height={500}
            alt="file"
          />
        </>
      )}
    </Container>
  );
};

export default HomePage;

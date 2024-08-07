import FormCreate from "./components/FormCreate";
import { useModal } from "../../hooks/useModal";
import React, { useState } from "react";
import DeleteConfirmation from "./components/DeleteConfirmation";
import { Banner } from "../../entities";
import {
  ActionIcon,
  Box,
  Button,
  Card,
  Container,
  Table,
  Image,
} from "@mantine/core";
import { useGetBannersQuery } from "../../services";
import { Pencil, Trash } from "tabler-icons-react";
import FormEdit from "./components/FormEdit";

const BannerPage = () => {
  const [modal, setModal] = useModal();
  const [selectedItem, setSelectedItem] = useState<Banner>();

  const { data: banners, refetch } = useGetBannersQuery({
    page: 1,
    perPage: 5,
  });

  const handleDeleteRequest = (item: Banner) => {
    setSelectedItem(item);
    setModal("delete", true);
  };

  const handleOnEditRequest = (item: any) => {
    setSelectedItem(item);
    setModal("edit", true);
  };

  const handleOnCreated = () => {
    setModal("create", false);
    refetch();
  };

  const handleOnUpdated = () => {
    setModal("edit", false);
    refetch();
  };

  const handleOnDeleted = () => {
    setModal("delete", false);
    refetch();
  };

  return (
    <Container size="xl">
      <Button onClick={() => setModal("create", true)}>Add New Banner</Button>

      <Box
        sx={(theme) => ({
          marginTop: theme.spacing.md,
        })}
      >
        <Card>
          <Table>
            <thead>
              <tr>
                <th>No</th>
                <th>Image</th>
                <th>Title</th>
                <th>Subtitle</th>
                <th>#Action</th>
              </tr>
            </thead>

            <tbody>
              {banners?.data.map((item) => (
                <tr key={item.id}>
                  <td>{banners.data.indexOf(item) + 1}</td>
                  <td>
                    <Image
                      radius="md"
                      src={item.imageSourceUrl}
                      alt={item.title}
                      width={150}
                    />
                  </td>
                  <td>{item.title}</td>
                  <td>{item.subTitle}</td>
                  <td
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 5,
                      height: 80,
                    }}
                  >
                    {/* <ActionIcon
                      color="blue"
                      onClick={() => handleOnEditRequest(item)}
                    >
                      <Pencil />
                    </ActionIcon> */}
                    <ActionIcon
                      color="red"
                      onClick={() => handleDeleteRequest(item)}
                    >
                      <Trash />
                    </ActionIcon>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
      </Box>

      <FormCreate
        open={modal.create}
        onClose={() => setModal("create", false)}
        onCreated={handleOnCreated}
      />

      {selectedItem && (
        <>
          <FormEdit
            data={selectedItem}
            open={modal.edit}
            onClose={() => setModal("edit", false)}
            onUpdated={handleOnUpdated}
          />

          <DeleteConfirmation
            item={selectedItem}
            open={modal.delete}
            onClose={() => setModal("delete", false)}
            onDeleted={handleOnDeleted}
          />
        </>
      )}
    </Container>
  );
};

export default BannerPage;

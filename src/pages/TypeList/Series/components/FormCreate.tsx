import React, {useEffect, useState} from "react";
import {
  usePostTypeSeriesMutation,
  useGetSkinConcernsQuery,
  useGetSkinTypesQuery,
} from "../../../../services";
import {ImagePicker} from "../../../../components/ImagePicker";
import {Modal, Box, Grid, InputWrapper, Input, Select, MultiSelect, Button} from "@mantine/core";
import {useFormik} from "formik";
import * as y from 'yup';
import {RichTextEditor} from "@mantine/rte";
import { useMantineTheme } from "@mantine/core";
import {useGetCategories} from "../hooks/useGetCategories";

type FormCreateProp = {
  open: boolean;
  onClose: () => void;
  onCreated: () => void;
}

export const FormCreate = (props: FormCreateProp) => {
  const {open, onClose, onCreated} = props;

  const theme = useMantineTheme();
  const series = useGetCategories();

  const [onSubmit, {data: result}] = usePostTypeSeriesMutation();
  const {data: skinConcerns} = useGetSkinConcernsQuery({page: 1, perPage: 100});
  const {data: skinTypes} = useGetSkinTypesQuery({page: 1, perPage: 100});

  const [icon, setIcon] = useState('');

  const [bottle, setBottle] = useState<string>('');
  const [bottleBox, setBottleBox] = useState<string>('');

  const validationSchema = y.object({
    name: y.string().required(),
    icon: y.string().required(),
    description: y.string()
  });

  const {values, errors, submitForm, setFieldValue, touched} = useFormik({
    validationSchema,
    initialValues: {
      name: '',
      description: '',
      banner: '',
      slug: '',
      icon: '',
    },
    onSubmit
  });

  useEffect(() => {
    if (result) {
      onCreated()
    }
  }, [result]);

  useEffect(() => {
    setFieldValue('icon', icon)
  }, [icon]);

  return (
      <Modal
          opened={open}
          onClose={onClose}
          size="xl"
          title="Add Series"
      >

        <Box
            sx={{
              marginTop: 1,
            }}
        >
          <Grid>
            <Grid.Col>
              <InputWrapper
                  id="input-name"
                  label="ProdSeries Name"
                  required
                  error={errors.name}
              >
                <Input
                    value={values.name}
                    onChange={(e: any) => setFieldValue('name', e.target.value)}
                />
              </InputWrapper>
            </Grid.Col>

            <Grid.Col>
              <InputWrapper
                  required
                  label="Content"
                  error={touched.description && errors.description}
              >
                <RichTextEditor
                    value={values.description}
                    onChange={(value) => setFieldValue("description", value)}
                />
              </InputWrapper>
            </Grid.Col>

            <Grid.Col>
              <InputWrapper
                  required
                  label="Icon"
                  error={errors.icon as string}
              >
                <ImagePicker
                    result={''}
                    propsOnChange={(value: any) => setFieldValue("icon", value[0])}
                />
              </InputWrapper>
            </Grid.Col>

            <Grid.Col>
              <InputWrapper
                  required
                  label="Banner"
                  error={errors.banner as string}
              >
                <ImagePicker
                    result={''}
                    propsOnChange={(value: any) => setFieldValue("banner", value[0])}
                    aspectRatio={1213/504}
                />
              </InputWrapper>
            </Grid.Col>
          </Grid>
        </Box>

        <Box
            sx={{
              display: 'flex',
              justifyContent: 'end',
              marginTop: theme.spacing.md
            }}
        >
          <Button
              onClick={onClose}
              variant="outline"
          >
            Cancel
          </Button>
          <Button
              onClick={submitForm}
              sx={{
                marginLeft: theme.spacing.md
              }}
          >
            Saves
          </Button>
        </Box>
      </Modal>
  );
};

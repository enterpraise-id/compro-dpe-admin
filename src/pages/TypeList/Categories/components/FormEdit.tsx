import React, {useEffect, useState} from "react";
import {Box, Button, Grid, Input, InputWrapper, Modal, MultiSelect, Select, TextInput} from "@mantine/core";
import {useFormik} from "formik";
import * as y from 'yup';
import '../../../../assets/style.css'
import {ImagePicker} from "../../../../components/ImagePicker";
import {usePutTypeCategoryMutation} from "../../../../services";
import {RichTextEditor} from "@mantine/rte";
import {TypeCategories} from "../../../../entities/TypeCategories";

type FormEditProp = {
  data: TypeCategories;
  open: boolean;
  onClose: () => void
  onUpdated: () => void
};

export const FormEdit = (props: FormEditProp) => {
  const {data, open, onClose, onUpdated} = props;

  const [onSubmit, {data: result}] = usePutTypeCategoryMutation();

  const [icon, setIcon] = useState('');

  const validationSchema = y.object({
    name: y.string().required(),
    slug: y.string().required(),
    icon: y.string(),
    banner: y.string(),
    description: y.string()
  });

  const {values, errors, setFieldValue, submitForm, touched} = useFormik({
    validationSchema,
    initialValues: {
      id: data.id,
      name: data.name,
      description: data.description,
      icon: data.icon,
      bgColorHex: data.bgColorHex,
      banner: data.banner,
      iconUrl: data.iconUrl,
      bannerUrl: data.bannerUrl,
      slug: data.slug,
    },
    onSubmit,
    enableReinitialize: true
  });

  useEffect(() => {
    if (result) {
      onUpdated()
    }
  }, [result]);

  useEffect(() => {
    setFieldValue('icon', icon);
  }, [icon]);

  return (

        <Modal
            opened={open}
            onClose={onClose}
            title="Edit Categories"
            size="xl"
        >
          <Box className="modal-body">
            <Grid>
              <Grid.Col>
                <InputWrapper
                    label="Type Categories Name"
                    error={errors.name as string}
                >
                  <Input
                      value={values.name}
                      onChange={(e: any) => setFieldValue("name", e.target.value)}
                  />
                </InputWrapper>
              </Grid.Col>
              <Grid.Col>
                <InputWrapper
                    label="Type Categories Slug"
                    error={errors.slug as string}
                >
                  <Input
                      value={values.slug}
                      onChange={(e: any) => setFieldValue("slug", e.target.value)}
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
                      defaultImage={values.iconUrl}/>
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
                      defaultImage={values.bannerUrl}
                      aspectRatio={1213/504}
                  />
                </InputWrapper>
              </Grid.Col>
            </Grid>
          </Box>

          <Box
              sx={(theme) => ({
                display: 'flex',
                justifyContent: 'end',
                marginTop: theme.spacing.md,
                gap: theme.spacing.md
              })}
          >
            <Button onClick={onClose} variant="outline">Cancel</Button>
            <Button onClick={() => submitForm()}>Save</Button>
          </Box>
        </Modal>
  );
};

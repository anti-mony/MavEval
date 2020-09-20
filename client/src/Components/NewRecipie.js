import React from "react";
import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";
import Field from "../Components/FormFields/Field";
import SelectField from "../Components/FormFields/SelectField";
import TextAreaField from "../Components/FormFields/TextAreaField";
import axios from "axios";

const NewRecipie = () => {
  return (
    <div className="push-navbar">
      <div className="container">
        <Formik
          initialValues={{
            name: "",
            description: "",
            type: "",
            category: "",
            preptime: 1,
            servings: 1,
            calories: 1,
            instructions: "",
            ingredients: [{ name: "", quantity: 1, unit: "" }],
          }}
          validationSchema={Yup.object({
            name: Yup.string().required("Required"),
            description: Yup.string().required("Required"),
            type: Yup.string().required("Required"),
            category: Yup.string().required("Required"),
            preptime: Yup.number()
              .min(1, "Minimum One minuteof prepration time")
              .required("Required"),
            servings: Yup.number()
              .min(1, "Minimum one serving")
              .required("Required"),
            calories: Yup.number()
              .min(1, "Minimum one calorie per serving")
              .required("Required"),
            instructions: Yup.string().required("Required"),
            ingredients: Yup.array()
              .of(
                Yup.object().shape({
                  name: Yup.string().required("Required"),
                  quantity: Yup.number().required("Required"),
                  unit: Yup.string(),
                })
              )
              .min(1, "Minimum 1 ingredient")
              .required("There must be at lease one ingredient"),
          })}
          onSubmit={async (values) => {
            const response = await axios
              .post("/recipies", values)
              .then((res) => {
                alert("Added the new recipe, view it the recipes viewer");
                return res.data;
              })
              .catch((err) => {
                console.error(err);
                alert("There was an error adding the new recipe");
              });
          }}
        >
          {({ values }) => (
            <Form className="container">
              <Field
                name="name"
                label="Dish Name"
                type="text"
                placeholder="Please enter a dish name"
                required
              />
              <Field
                name="description"
                label="Description"
                type="text"
                placeholder="Please enter the dish's description"
                required
              />
              <SelectField
                name="type"
                label="Type"
                options={["Non Vegetarian", "Vegetarian"]}
                required
              />
              <Field
                name="category"
                label="Category"
                type="text"
                placeholder="Please enter a category eg. Snack, dessert, dinner"
                required
              />
              <Field
                name="preptime"
                label="Prepration Time (in minutes)"
                type="number"
                placeholder="Please enter the number of prepration minutes"
                min="1"
                required
              />
              <Field
                name="servings"
                label="Number of servings"
                type="number"
                placeholder="Please enter the number of servings"
                min="1"
                required
              />
              <Field
                name="calories"
                label="Calories per serving"
                type="number"
                placeholder="Please enter the number of calories per serving"
                min="1"
                required
              />

              <FieldArray name="ingredients">
                {({ remove, push }) => (
                  <div>
                    <div
                      style={{
                        fontWeight: "700",
                        fontSize: "1.25em",
                        marginTop: "0.5em",
                        marginBottom: "-0.5em",
                      }}
                    >
                      Ingredients
                      <button
                        style={{ margin: "0 1em" }}
                        type="button"
                        onClick={() =>
                          push({ name: "", quantity: 1, unit: "" })
                        }
                      >
                        Add
                      </button>
                    </div>

                    {values.ingredients.length > 0 &&
                      values.ingredients.map((item, index) => (
                        <div className="row">
                          <div style={{ width: "auto" }}>
                            {" "}
                            <Field
                              name={`ingredients[${index}].name`}
                              label="Name"
                              type="text"
                              placeholder="Enter the name "
                              required
                            />
                          </div>
                          <div style={{ width: "auto" }}>
                            <Field
                              name={`ingredients[${index}].quantity`}
                              label="Quantity"
                              type="number"
                              placeholder="Enter the quantity"
                              min="1"
                              required
                            />
                          </div>
                          <div style={{ width: "auto" }}>
                            <Field
                              name={`ingredients[${index}].unit`}
                              label="Unit"
                              type="text"
                              placeholder="Enter the unit"
                            />
                          </div>
                          <div style={{ width: "auto" }}>
                            <button
                              style={{ margin: "0 1em" }}
                              type="button"
                              onClick={() => {
                                if (values.ingredients.length > 1)
                                  remove(index);
                              }}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </FieldArray>

              <TextAreaField
                name="instructions"
                label="Instructions"
                type="text"
                placeholder="Please enter how to make the dish"
                required
              />

              <button type="submit" className="form-button">
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default NewRecipie;

import { findCountry } from "@lib/extensions/data/COUNTRY_FLAGS";
import sleep from "@lib/extensions/helpers/sleep";
import { ApplicationFormService } from "@lib/services/application-form.service";
import {
  Mode,
  VisaApplicationFormInterface,
  VisaFormUnionType,
  mapVisaApplicationFormInterfaceToApplicationFormRequestInput,
} from "@lib/types";
import { CreateVisaApplicationResponse } from "@lib/types/response-models/application-form/application-form.type";
import { visaInitVals } from "@lib/types/schema";
import { UploadedDoc } from "@organism/form/applicationForm";
import { create } from "zustand";

interface State {
  form: VisaApplicationFormInterface;
  highestStep: number;
  step: number;
  mode: Mode;
  uploadedDocuments: UploadedDoc[];
  createVisaApplicationResponse: CreateVisaApplicationResponse | null;
}
interface Actions {
  prevStep: () => void;
  nextStep: (params: { data: VisaFormUnionType }) => void;
  saveProgress: (params: {
    data: VisaApplicationFormInterface;
    uploadedDocuments: UploadedDoc[];
  }) => void;
  setUploadedDocuments: (docs: UploadedDoc[]) => void;
  fetchRecentProgressFromSession: () => void;
  fetchDetailsFromURL: (params: {
    homeCountry: string;
    destination: string;
    visaType: string;
  }) => void;
  createVisaApplication: (params: {
    data: VisaApplicationFormInterface;
  }) => Promise<void>;
  createFormFeeCharge: (params: {
    data: CreateVisaApplicationResponse;
  }) => Promise<any>;
  setStep: (params: { step: number }) => void;
}

export const useApplicationFormStore = create<State & Actions>(
  (set): State & Actions => ({
    form: visaInitVals,
    step: 1,
    highestStep: 1,
    mode: Mode.init,
    createVisaApplicationResponse: null,
    uploadedDocuments: [],

    nextStep: async ({ data }: { data: VisaFormUnionType }) => {
      set({
        mode: Mode.loading,
      });
      await sleep(2000);
      set((state) => ({
        mode: Mode.loaded,
        step: state.step + 1,
        highestStep:
          state.step + 1 > state.highestStep
            ? state.step + 1
            : state.highestStep,
        form: {
          ...state.form,
          ...data,
        },
      }));
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    },

    prevStep: () => {
      set((state) => ({
        step:
          state.mode == Mode.loading || state.step == 1
            ? state.step
            : state.step - 1,
      }));
    },

    saveProgress: ({
      data,
      uploadedDocuments,
    }: {
      data: VisaApplicationFormInterface;
      uploadedDocuments: UploadedDoc[];
    }) => {
      sessionStorage.setItem("visa_application_form", JSON.stringify(data));
      sessionStorage.setItem(
        "visa_application_uploaded_documents",
        JSON.stringify(uploadedDocuments ?? [])
      );
    },

    fetchRecentProgressFromSession: () => {
      const form = sessionStorage.getItem("visa_application_form");
      const uploadedDocuments = sessionStorage.getItem(
        "visa_application_uploaded_documents"
      );
      const recent = {
        form: form ? (JSON.parse(form) as VisaApplicationFormInterface) : null,
        uploadedDocuments: uploadedDocuments
          ? (JSON.parse(uploadedDocuments) as UploadedDoc[])
          : null,
      };
      set((state) => ({
        form: recent.form ?? state.form,
        uploadedDocuments: recent.uploadedDocuments ?? [],
      }));
    },

    createVisaApplication: async ({
      data,
    }: {
      data: VisaApplicationFormInterface;
    }) => {
      set({ mode: Mode.loading, form: data });
      const payload =
        mapVisaApplicationFormInterfaceToApplicationFormRequestInput({ data });
      return await ApplicationFormService.createVisaApplication({
        payload,
      })
        .then((response) => {
          set((state) => ({
            createVisaApplicationResponse: response,
            step: state.step + 1,
            mode: Mode.loaded,
          }));
        })
        .catch((error) => {
          set({
            mode: Mode.error,
          });
          throw error;
        });
    },

    createFormFeeCharge: async ({
      data,
    }: {
      data: CreateVisaApplicationResponse;
    }) => {
      set({ mode: Mode.loading });
      return await ApplicationFormService.createFormFeeCharge({
        payload: data,
      })
        .then((response) => {
          set((state) => ({
            mode: Mode.loaded,
          }));
          return response;
        })
        .catch((error) => {
          set({
            mode: Mode.error,
          });
          throw error;
        });
    },

    fetchDetailsFromURL: ({
      homeCountry,
      destination,
      visaType,
    }: {
      homeCountry: string;
      destination: string;
      visaType: string;
    }) => {
      console.log(destination);
      set((state) => ({
        form: {
          ...state.form,
          tripDetails: {
            ...state.form.tripDetails,
            homeCountry: findCountry({ name: homeCountry }),
            destination: findCountry({ name: destination }),
            visaType,
          },
        },
      }));
    },

    setStep: ({ step }: { step: number }) => {
      set({ step });
    },

    setUploadedDocuments: (docs: UploadedDoc[]) => {
      set({ uploadedDocuments: docs });
    },
  })
);

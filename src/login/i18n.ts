import { createUseI18n } from "keycloakify/login";
import { ko } from "../ko.ts";

export const { useI18n, ofTypeI18n } = createUseI18n({
    ko
});

export type I18n = typeof ofTypeI18n;

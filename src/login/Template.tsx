import { useEffect } from "react";
import { assert } from "keycloakify/tools/assert";
import { clsx } from "keycloakify/tools/clsx";
import type { TemplateProps } from "keycloakify/login/TemplateProps";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import { useInsertScriptTags } from "keycloakify/tools/useInsertScriptTags";
import { useInsertLinkTags } from "keycloakify/tools/useInsertLinkTags";
import { useSetClassName } from "keycloakify/tools/useSetClassName";
import type { I18n } from "./i18n";
import type { KcContext } from "./KcContext";

export default function Template(props: TemplateProps<KcContext, I18n>) {
    const {
        // displayInfo = false,
        displayMessage = true,
        // displayRequiredFields = false,
        // headerNode,
        socialProvidersNode,
        // infoNode = null,
        documentTitle,
        bodyClassName,
        kcContext,
        i18n,
        doUseDefaultCss,
        classes,
        children
    } = props;

    const { kcClsx } = getKcClsx({ doUseDefaultCss, classes });

    const { msg, msgStr,
        // getChangeLocaleUrl, labelBySupportedLanguageTag, currentLanguageTag
    } = i18n;

    const {
        // realm,
        locale, auth, url, message, isAppInitiatedAction, authenticationSession, scripts } = kcContext;

    useEffect(() => {
        document.title = documentTitle ?? msgStr("loginTitle", kcContext.realm.displayName);
    }, []);

    useSetClassName({
        qualifiedName: "html",
        className: kcClsx("kcHtmlClass")
    });

    useSetClassName({
        qualifiedName: "body",
        className: bodyClassName ?? kcClsx("kcBodyClass")
    });

    useEffect(() => {
        const { currentLanguageTag } = locale ?? {};

        if (currentLanguageTag === undefined) {
            return;
        }

        const html = document.querySelector("html");
        assert(html !== null);
        html.lang = currentLanguageTag;
    }, []);

    const { areAllStyleSheetsLoaded } = useInsertLinkTags({
        componentOrHookName: "Template",
        hrefs: !doUseDefaultCss
            ? []
            : [
                `${url.resourcesCommonPath}/node_modules/@patternfly/patternfly/patternfly.min.css`,
                `${url.resourcesCommonPath}/node_modules/patternfly/dist/css/patternfly.min.css`,
                `${url.resourcesCommonPath}/node_modules/patternfly/dist/css/patternfly-additions.min.css`,
                `${url.resourcesCommonPath}/lib/pficon/pficon.css`,
                `${url.resourcesPath}/css/login.css`
            ]
    });

    const { insertScriptTags } = useInsertScriptTags({
        componentOrHookName: "Template",
        scriptTags: [
            {
                type: "module",
                src: `${url.resourcesPath}/js/menu-button-links.js`
            },
            ...(authenticationSession === undefined
                ? []
                : [
                    {
                        type: "module",
                        textContent: [
                            `import { checkCookiesAndSetTimer } from "${url.resourcesPath}/js/authChecker.js";`,
                            ``,
                            `checkCookiesAndSetTimer(`,
                            `  "${authenticationSession.authSessionId}",`,
                            `  "${authenticationSession.tabId}",`,
                            `  "${url.ssoLoginInOtherTabsUrl}"`,
                            `);`
                        ].join("\n")
                    } as const
                ]),
            ...scripts.map(
                script =>
                    ({
                        type: "text/javascript",
                        src: script
                    }) as const
            )
        ]
    });

    useEffect(() => {
        if (areAllStyleSheetsLoaded) {
            insertScriptTags();
        }
    }, [areAllStyleSheetsLoaded]);

    if (!areAllStyleSheetsLoaded) {
        return null;
    }

    return (
        <div className={clsx(kcClsx("kcLoginClass"), "h-screen w-screen flex flex-1 bg-background p-0")}>
            <div className="flex-1 flex items-center justify-center">
                {/* 큰 제목 */}
                {/*<div id="kc-header" className={clsx(kcClsx("kcHeaderClass"), "bg-teal-400")}>*/}
                {/*    <div id="kc-header-wrapper" className={clsx(kcClsx("kcHeaderWrapperClass"), "text-fuchsia-500")}>*/}
                {/*        <div className="tracking-wide font-bold">{msg("loginTitleHtml", realm.displayNameHtml)}</div>*/}
                {/*    </div>*/}
                {/*</div>*/}

                {/* 로그인 바깥 폼 */}
                <div
                    className="bg-transparent flex flex-col justify-between items-center space-y-10 cursor-default">
                    {/*<header className={kcClsx("kcFormHeaderClass")}>*/}
                    {/*    {realm.internationalizationEnabled && (assert(locale !== undefined), locale.supported.length > 1) && (*/}
                    {/*        <div className={kcClsx("kcLocaleMainClass")} id="kc-locale">*/}
                    {/*            <div id="kc-locale-wrapper" className={kcClsx("kcLocaleWrapperClass")}>*/}
                    {/*                <div id="kc-locale-dropdown"*/}
                    {/*                     className={clsx("menu-button-links", kcClsx("kcLocaleDropDownClass"))}>*/}
                    {/*                    <button*/}
                    {/*                        tabIndex={1}*/}
                    {/*                        id="kc-current-locale-link"*/}
                    {/*                        aria-label={msgStr("languages")}*/}
                    {/*                        aria-haspopup="true"*/}
                    {/*                        aria-expanded="false"*/}
                    {/*                        aria-controls="language-switch1"*/}
                    {/*                    >*/}
                    {/*                        {labelBySupportedLanguageTag[currentLanguageTag]}*/}
                    {/*                    </button>*/}
                    {/*                    <ul*/}
                    {/*                        role="menu"*/}
                    {/*                        tabIndex={-1}*/}
                    {/*                        aria-labelledby="kc-current-locale-link"*/}
                    {/*                        aria-activedescendant=""*/}
                    {/*                        id="language-switch1"*/}
                    {/*                        className={kcClsx("kcLocaleListClass")}*/}
                    {/*                    >*/}
                    {/*                        {locale.supported.map(({ languageTag }, i) => (*/}
                    {/*                            <li key={languageTag} className={kcClsx("kcLocaleListItemClass")}*/}
                    {/*                                role="none">*/}
                    {/*                                <a*/}
                    {/*                                    role="menuitem"*/}
                    {/*                                    id={`language-${i + 1}`}*/}
                    {/*                                    className={kcClsx("kcLocaleItemClass")}*/}
                    {/*                                    href={getChangeLocaleUrl(languageTag)}*/}
                    {/*                                >*/}
                    {/*                                    {labelBySupportedLanguageTag[languageTag]}*/}
                    {/*                                </a>*/}
                    {/*                            </li>*/}
                    {/*                        ))}*/}
                    {/*                    </ul>*/}
                    {/*                </div>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*    )}*/}
                    {/*    {(() => {*/}
                    {/*        const node = !(auth !== undefined && auth.showUsername && !auth.showResetCredentials) ? (*/}
                    {/*            <h1 id="kc-page-title">{headerNode}</h1>*/}
                    {/*        ) : (*/}
                    {/*            <div id="kc-username" className={kcClsx("kcFormGroupClass")}>*/}
                    {/*                <label id="kc-attempted-username">{auth.attemptedUsername}</label>*/}
                    {/*                <a id="reset-login" href={url.loginRestartFlowUrl}*/}
                    {/*                   aria-label={msgStr("restartLoginTooltip")}>*/}
                    {/*                    <div className="kc-login-tooltip">*/}
                    {/*                        <i className={kcClsx("kcResetFlowIcon")}></i>*/}
                    {/*                        <span className="kc-tooltip-text">{msg("restartLoginTooltip")}</span>*/}
                    {/*                    </div>*/}
                    {/*                </a>*/}
                    {/*            </div>*/}
                    {/*        );*/}

                    {/*        if (displayRequiredFields) {*/}
                    {/*            return (*/}
                    {/*                <div className={kcClsx("kcContentWrapperClass")}>*/}
                    {/*                    <div className={clsx(kcClsx("kcLabelWrapperClass"), "subtitle")}>*/}
                    {/*                    <span className="subtitle">*/}
                    {/*                        <span className="required">*</span>*/}
                    {/*                        {msg("requiredFields")}*/}
                    {/*                    </span>*/}
                    {/*                    </div>*/}
                    {/*                    <div className="col-md-10">{node}</div>*/}
                    {/*                </div>*/}
                    {/*            );*/}
                    {/*        }*/}

                    {/*        return node;*/}
                    {/*    })()}*/}
                    {/*</header>*/}

                    <div className="flex flex-col items-center space-y-1.5">
                        <div className="text-2xl font-bold tracking-wide text-primary">MEMOCODE</div>
                        <div className="text-[14px] text-slate-500">소셜 로그인으로 빠르고 쉽게 메모코드를 시작해보세요!</div>
                    </div>

                    <div className="space-y-5">
                        <div id="kc-content">
                            <div id="kc-content-wrapper">
                                {/* App-initiated actions should not see warning messages about the need to complete the action during login. */}
                                {displayMessage && message !== undefined && (message.type !== "warning" || !isAppInitiatedAction) && (
                                    <div
                                        className={clsx(
                                            `alert-${message.type}`,
                                            kcClsx("kcAlertClass"),
                                            `pf-m-${message?.type === "error" ? "danger" : message.type}`
                                        )}
                                    >
                                        <div className="pf-c-alert__icon">
                                            {message.type === "success" &&
                                                <span className={kcClsx("kcFeedbackSuccessIcon")}></span>}
                                            {message.type === "warning" &&
                                                <span className={kcClsx("kcFeedbackWarningIcon")}></span>}
                                            {message.type === "error" &&
                                                <span className={kcClsx("kcFeedbackErrorIcon")}></span>}
                                            {message.type === "info" &&
                                                <span className={kcClsx("kcFeedbackInfoIcon")}></span>}
                                        </div>
                                        <span
                                            className={kcClsx("kcAlertTitleClass")}
                                            dangerouslySetInnerHTML={{
                                                __html: message.summary
                                            }}
                                        />
                                    </div>
                                )}

                                {children}

                                {auth !== undefined && auth.showTryAnotherWayLink && (
                                    <form id="kc-select-try-another-way-form" action={url.loginAction} method="post">
                                        <div className={kcClsx("kcFormGroupClass")}>
                                            <div className={kcClsx("kcFormGroupClass")}>
                                                <input type="hidden" name="tryAnotherWay" value="on" />
                                                <a
                                                    href="#"
                                                    id="try-another-way"
                                                    onClick={() => {
                                                        document.forms["kc-select-try-another-way-form" as never].submit();
                                                        return false;
                                                    }}
                                                >
                                                    {msg("doTryAnotherWay")}
                                                </a>
                                            </div>
                                        </div>
                                    </form>
                                )}

                                {socialProvidersNode}

                                {/* 회원가입 박스 */}
                                {/*{displayInfo && (*/}
                                {/*    <div id="kc-info" className={kcClsx("kcSignUpClass")}>*/}
                                {/*        <div id="kc-info-wrapper" className={kcClsx("kcInfoAreaWrapperClass")}>*/}
                                {/*            {infoNode}*/}
                                {/*        </div>*/}
                                {/*    </div>*/}
                                {/*)}*/}
                            </div>
                        </div>

                        <div className="text-slate-500 tracking-wide">
                            <span>계속 진행하시면 </span>
                            <span
                                className="underline underline-offset-4 cursor-pointer hover:text-slate-400">이용약관</span>
                            <span> 및 </span>
                            <span className="underline underline-offset-4 cursor-pointer hover:text-slate-400">
                            개인정보 처리방침
                        </span>
                            <span>에 동의하게 됩니다.</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

import { clsx } from "keycloakify/tools/clsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";

export default function Login(props: PageProps<Extract<KcContext, { pageId: "login.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const {
        social, realm,
        // , url, usernameHidden, login, auth,
        registrationDisabled, messagesPerField
    } = kcContext;

    const {
        msg
        // msgStr
    } = i18n;

    // const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={!messagesPerField.existsError("username", "password")}
            headerNode={msg("loginAccountTitle")}
            displayInfo={realm.password && realm.registrationAllowed && !registrationDisabled}
            infoNode={
                <>
                    {/* 회원가입 */}
                    {/*<div id="kc-registration-container">*/}
                    {/*    <div id="kc-registration">*/}
                    {/*    <span>*/}
                    {/*        {msg("noAccount")}{" "}*/}
                    {/*        <a tabIndex={8} href={url.registrationUrl}>*/}
                    {/*            {msg("doRegister")}*/}
                    {/*        </a>*/}
                    {/*    </span>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </>
            }
            socialProvidersNode={
                <>
                    {/* SNS 로그인 */}
                    {realm.password && social.providers?.length && (
                        // <div id="kc-social-providers" className={kcClsx("kcFormSocialAccountSectionClass")}>
                        //     <hr />
                        //     <h2>{msg("identity-provider-login-label")}</h2>
                        //     <ul className={kcClsx("kcFormSocialAccountListClass", social.providers.length > 3 && "kcFormSocialAccountListGridClass")}>
                        //         {social.providers.map((...[p, , providers]) => (
                        //             <li key={p.alias}>
                        //                 <a
                        //                     id={`social-${p.alias}`}
                        //                     className={kcClsx(
                        //                         "kcFormSocialAccountListButtonClass",
                        //                         providers.length > 3 && "kcFormSocialAccountGridItem"
                        //                     )}
                        //                     type="button"
                        //                     href={p.loginUrl}
                        //                 >
                        //                     {p.iconClasses &&
                        //                         <i className={clsx(kcClsx("kcCommonLogoIdP"), p.iconClasses)}
                        //                            aria-hidden="true"></i>}
                        //                     <span
                        //                         className={clsx(kcClsx("kcFormSocialAccountNameClass"), p.iconClasses && "kc-social-icon-text")}>
                        //                         {p.displayName}
                        //                     </span>
                        //                 </a>
                        //             </li>
                        //         ))}
                        //     </ul>
                        // </div>
                        <div id="kc-social-providers" className={kcClsx("kcFormSocialAccountSectionClass")}>
                            <ul className={clsx(kcClsx("kcFormSocialAccountListClass", social.providers.length > 3 && "kcFormSocialAccountListGridClass"), "flex bg-red-400")}>
                                {social.providers.map((...[p, , providers]) => {
                                    return (
                                        <>
                                            <li
                                                key={p.alias}
                                                className="flex justify-center bg-[#fee518] hover:bg-[#fee518]/80 w-full h-12 rounded cursor-pointer">
                                                <a
                                                    id={`social-${p.alias}`}
                                                    href={p.loginUrl}
                                                    className={clsx(kcClsx(providers.length > 3), "flex items-center space-x-2 hover:no-underline")}
                                                    type="button"
                                                >
                                                    <img
                                                        src="/keycloak-resources/login/resources/img/kakao_logo.png"
                                                        alt="kakao_logo"
                                                        className="w-5 h-5" />
                                                    <div className="text-[16px] text-foreground font-semibold">
                                                        카카오 로그인
                                                    </div>
                                                </a>
                                            </li>

                                            <div className="w-full h-5 border-b border-b-slate-200"></div>
                                        </>
                                    );
                                })}
                            </ul>
                        </div>
                    )}
                </>
            }
        >
            {/* 로그인 안쪽 폼 */}
            <div id="kc-form">
                {/*<div id="kc-form-wrapper">*/}
                {/*    {realm.password && (*/}
                {/*        <form*/}
                {/*            id="kc-form-login"*/}
                {/*            onSubmit={() => {*/}
                {/*                setIsLoginButtonDisabled(true);*/}
                {/*                return true;*/}
                {/*            }}*/}
                {/*            action={url.loginAction}*/}
                {/*            method="post"*/}
                {/*        >*/}
                {/*            /!* 아이디 또는 이메일 *!/*/}
                {/*            {!usernameHidden && (*/}
                {/*                <div className={kcClsx("kcFormGroupClass")}>*/}
                {/*                    <label htmlFor="username" className={kcClsx("kcLabelClass")}>*/}
                {/*                        {!realm.loginWithEmailAllowed*/}
                {/*                            ? msg("username")*/}
                {/*                            : !realm.registrationEmailAsUsername*/}
                {/*                                ? msg("usernameOrEmail")*/}
                {/*                                : msg("email")}*/}
                {/*                    </label>*/}
                {/*                    <input*/}
                {/*                        tabIndex={2}*/}
                {/*                        id="username"*/}
                {/*                        className={kcClsx("kcInputClass")}*/}
                {/*                        name="username"*/}
                {/*                        defaultValue={login.username ?? ""}*/}
                {/*                        type="text"*/}
                {/*                        autoFocus*/}
                {/*                        autoComplete="username"*/}
                {/*                        aria-invalid={messagesPerField.existsError("username", "password")}*/}
                {/*                    />*/}
                {/*                    {messagesPerField.existsError("username", "password") && (*/}
                {/*                        <span id="input-error" className={kcClsx("kcInputErrorMessageClass")}*/}
                {/*                              aria-live="polite">*/}
                {/*                            {messagesPerField.getFirstError("username", "password")}*/}
                {/*                        </span>*/}
                {/*                    )}*/}
                {/*                </div>*/}
                {/*            )}*/}

                {/*            /!* 비밀번호 *!/*/}
                {/*            <div className={kcClsx("kcFormGroupClass")}>*/}
                {/*                <label htmlFor="password" className={kcClsx("kcLabelClass")}>*/}
                {/*                    {msg("password")}*/}
                {/*                </label>*/}
                {/*                <PasswordWrapper kcClsx={kcClsx} i18n={i18n} passwordInputId="password">*/}
                {/*                    <input*/}
                {/*                        tabIndex={3}*/}
                {/*                        id="password"*/}
                {/*                        className={kcClsx("kcInputClass")}*/}
                {/*                        name="password"*/}
                {/*                        type="password"*/}
                {/*                        autoComplete="current-password"*/}
                {/*                        aria-invalid={messagesPerField.existsError("username", "password")}*/}
                {/*                    />*/}
                {/*                </PasswordWrapper>*/}
                {/*                {usernameHidden && messagesPerField.existsError("username", "password") && (*/}
                {/*                    <span id="input-error" className={kcClsx("kcInputErrorMessageClass")}*/}
                {/*                          aria-live="polite">*/}
                {/*                        {messagesPerField.getFirstError("username", "password")}*/}
                {/*                    </span>*/}
                {/*                )}*/}
                {/*            </div>*/}

                {/*            /!* 로그인 상태 유지 *!/*/}
                {/*            <div className={kcClsx("kcFormGroupClass", "kcFormSettingClass")}>*/}
                {/*                <div id="kc-form-options">*/}
                {/*                    {realm.rememberMe && !usernameHidden && (*/}
                {/*                        <div className="checkbox">*/}
                {/*                            <label>*/}
                {/*                                <input*/}
                {/*                                    tabIndex={5}*/}
                {/*                                    id="rememberMe"*/}
                {/*                                    name="rememberMe"*/}
                {/*                                    type="checkbox"*/}
                {/*                                    defaultChecked={!!login.rememberMe}*/}
                {/*                                />{" "}*/}
                {/*                                {msg("rememberMe")}*/}
                {/*                            </label>*/}
                {/*                        </div>*/}
                {/*                    )}*/}
                {/*                </div>*/}
                {/*                <div className={kcClsx("kcFormOptionsWrapperClass")}>*/}
                {/*                    {realm.resetPasswordAllowed && (*/}
                {/*                        <span>*/}
                {/*                            <a tabIndex={6} href={url.loginResetCredentialsUrl}>*/}
                {/*                                {msg("doForgotPassword")}*/}
                {/*                            </a>*/}
                {/*                        </span>*/}
                {/*                    )}*/}
                {/*                </div>*/}
                {/*            </div>*/}

                {/*            /!* 로그인 버튼 *!/*/}
                {/*            <div id="kc-form-buttons" className={kcClsx("kcFormGroupClass")}>*/}
                {/*                <input type="hidden" id="id-hidden-input" name="credentialId"*/}
                {/*                       value={auth.selectedCredential} />*/}
                {/*                <input*/}
                {/*                    tabIndex={7}*/}
                {/*                    disabled={isLoginButtonDisabled}*/}
                {/*                    className={clsx(*/}
                {/*                        kcClsx("kcButtonClass", "kcButtonPrimaryClass", "kcButtonBlockClass", "kcButtonLargeClass"),*/}
                {/*                        "rounded-lg"*/}
                {/*                    )}*/}
                {/*                    name="login"*/}
                {/*                    id="kc-login"*/}
                {/*                    type="submit"*/}
                {/*                    value={msgStr("doLogIn")}*/}
                {/*                />*/}
                {/*            </div>*/}
                {/*        </form>*/}
                {/*    )}*/}
                {/*</div>*/}


                {/* 작업 할때 테스트용 - 나중에 지우기 */}
                <div id="kc-social-providers" className={kcClsx("kcFormSocialAccountSectionClass")}>
                    <ul className={clsx(kcClsx("kcFormSocialAccountListClass",
                            // social.providers.length > 3 &&
                            "kcFormSocialAccountListGridClass"),
                        "flex")}>
                        {/*{social.providers.map((...[p, , providers]) => {*/}
                        {/*    return (*/}
                        <li
                            // key={p.alias}
                            className="flex justify-center bg-[#fee518] w-full h-12 hover:bg-[#fee518]/80 rounded cursor-pointer">
                            <a
                                // id={`social-${p.alias}`}
                                // href={p.loginUrl}
                                className={clsx(
                                    // kcClsx(providers.length > 3),
                                    "flex items-center space-x-2 hover:no-underline")}
                                type="button"
                            >
                                <img
                                    src="/keycloak-resources/login/resources/img/kakao_logo.png"
                                    alt="kakao_logo"
                                    className="w-5 h-5" />
                                <div className="text-[16px] text-foreground font-semibold">카카오 로그인</div>
                            </a>
                        </li>

                        <div className="w-full h-5 border-b border-b-slate-200"></div>
                        {/*    );*/}
                        {/*}}*/}
                    </ul>
                </div>

            </div>
        </Template>
    );
}

// 비밀번호 보기/숨기기
// function PasswordWrapper(props: { kcClsx: KcClsx; i18n: I18n; passwordInputId: string; children: JSX.Element }) {
//     const { kcClsx, i18n, passwordInputId, children } = props;
//
//     const { msgStr } = i18n;
//
//     const [isPasswordRevealed, toggleIsPasswordRevealed] = useReducer((isPasswordRevealed: boolean) => !isPasswordRevealed, false);
//
//     useEffect(() => {
//         const passwordInputElement = document.getElementById(passwordInputId);
//
//         assert(passwordInputElement instanceof HTMLInputElement);
//
//         passwordInputElement.type = isPasswordRevealed ? "text" : "password";
//     }, [isPasswordRevealed]);
//
//     return (
//         <div className={kcClsx("kcInputGroup")}>
//
//             {/* 비밀번호 입력 폼 */}
//             {children}
//
//             {/* 보기/숨기기 버튼 */}
//             <button
//                 type="button"
//                 className={kcClsx("kcFormPasswordVisibilityButtonClass")}
//                 aria-label={msgStr(isPasswordRevealed ? "hidePassword" : "showPassword")}
//                 aria-controls={passwordInputId}
//                 onClick={toggleIsPasswordRevealed}
//             >
//                 <i className={kcClsx(isPasswordRevealed ? "kcFormPasswordVisibilityIconHide" : "kcFormPasswordVisibilityIconShow")}
//                    aria-hidden />
//             </button>
//         </div>
//     );
// }
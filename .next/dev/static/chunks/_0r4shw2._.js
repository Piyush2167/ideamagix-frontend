(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/api/axios.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-client] (ecmascript)");
;
const api = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].create({
    baseURL: `${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_API_BASE_URL}/api`
});
// Let's add token interceptor
api.interceptors.request.use((config)=>{
    const doctorInfo = JSON.parse(localStorage.getItem('doctorInfo'));
    const patientInfo = JSON.parse(localStorage.getItem('patientInfo'));
    let token = null;
    // If hitting doctor or prescriptions route, prefer doctor token
    if ((config.url.includes('/doctor') || config.url.includes('/prescriptions')) && doctorInfo?.token) {
        token = doctorInfo.token;
    } else if (patientInfo?.token) {
        token = patientInfo.token;
    } else if (doctorInfo?.token) {
        token = doctorInfo.token;
    }
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error)=>{
    return Promise.reject(error);
});
const __TURBOPACK__default__export__ = api;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/context/DoctorAuthContext.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DoctorAuthContext",
    ()=>DoctorAuthContext,
    "DoctorAuthProvider",
    ()=>DoctorAuthProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$api$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/api/axios.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
const DoctorAuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])();
const DoctorAuthProvider = ({ children })=>{
    _s();
    const [doctor, setDoctor] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DoctorAuthProvider.useEffect": ()=>{
            const storedDoctor = localStorage.getItem('doctorInfo');
            if (storedDoctor) setDoctor(JSON.parse(storedDoctor));
        }
    }["DoctorAuthProvider.useEffect"], []);
    const login = async (email, password)=>{
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$api$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post('/doctor/auth/login', {
            email,
            password
        });
        setDoctor(res.data);
        localStorage.setItem('doctorInfo', JSON.stringify(res.data));
    };
    const register = async (formData)=>{
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$api$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post('/doctor/auth/register', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        setDoctor(res.data);
        localStorage.setItem('doctorInfo', JSON.stringify(res.data));
    };
    const logout = ()=>{
        setDoctor(null);
        localStorage.removeItem('doctorInfo');
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DoctorAuthContext.Provider, {
        value: {
            doctor,
            login,
            register,
            logout
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/context/DoctorAuthContext.jsx",
        lineNumber: 35,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(DoctorAuthProvider, "L1tzpLwUDrjRQmEI77nhoH5WZuY=");
_c = DoctorAuthProvider;
var _c;
__turbopack_context__.k.register(_c, "DoctorAuthProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/context/PatientAuthContext.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PatientAuthContext",
    ()=>PatientAuthContext,
    "PatientAuthProvider",
    ()=>PatientAuthProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$api$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/api/axios.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
const PatientAuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])();
const PatientAuthProvider = ({ children })=>{
    _s();
    const [patient, setPatient] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PatientAuthProvider.useEffect": ()=>{
            const stored = localStorage.getItem('patientInfo');
            if (stored) setPatient(JSON.parse(stored));
        }
    }["PatientAuthProvider.useEffect"], []);
    const login = async (email, password)=>{
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$api$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post('/patient/auth/login', {
            email,
            password
        });
        setPatient(res.data);
        localStorage.setItem('patientInfo', JSON.stringify(res.data));
    };
    const register = async (formData)=>{
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$api$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post('/patient/auth/register', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        setPatient(res.data);
        localStorage.setItem('patientInfo', JSON.stringify(res.data));
    };
    const logout = ()=>{
        setPatient(null);
        localStorage.removeItem('patientInfo');
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PatientAuthContext.Provider, {
        value: {
            patient,
            login,
            register,
            logout
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/context/PatientAuthContext.jsx",
        lineNumber: 35,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(PatientAuthProvider, "VNJsomhgjD9KVOv1YnnE6EPNs/g=");
_c = PatientAuthProvider;
var _c;
__turbopack_context__.k.register(_c, "PatientAuthProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_0r4shw2._.js.map
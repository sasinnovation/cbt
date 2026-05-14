import { authState, createToken, getUserFromToken } from "./authState";

export function mockFetch(url:any, options:any={}) {
  const path = String(url);

  let body:any = {};
  try { body = options.body ? JSON.parse(options.body) : {}; } catch {}

  const email = (body.email || "").toLowerCase();
  const password = (body.password || "").toLowerCase();
  const role = (body.role || "STUDENT").toUpperCase();

  const auth = options?.headers?.authorization;

  function res(status:number,data:any,contentType?:string){
    return {
      status,
      ok: status >= 200 && status < 300,
      json: async ()=>data,
      headers:{
        get:(k:string)=>k.toLowerCase()==="content-type"?contentType||null:null
      }
    };
  }

  // ================= AUTH =================
  if(path.includes("/api/auth/register")){
    if(!email||!password) return res(400,{success:false});
    if(authState.users.has(email)) return res(409,{success:false});

    authState.users.set(email,{email,password,role});
    return res(201,{success:true,user:{email,role}});
  }

  if(path.includes("/api/auth/login")){
    const u = authState.users.get(email);
    if(!u || u.password!==password) return res(401,{success:false});

    const token = createToken(email);
    authState.tokens.set(token,email);

    return res(200,{success:true,token,user:{email}});
  }

  if(path.includes("/api/auth/profile")){
    const user = getUserFromToken(auth);
    if(!user) return res(401,{success:false});

    return res(200,{success:true,profile:user});
  }

  // ================= EXAMS =================
  if(path.includes("/api/exam/list")){
    const user = getUserFromToken(auth);
    if(!user) return res(401,{success:false});

    return res(200,{success:true,exams:[{id:"1",title:"Mock Exam"}]});
  }

  if(path.includes("/api/exam/submit")){
    if(!body?.answers) return res(400,{success:false});
    return res(200,{success:true,submission:{score:80}});
  }

  if(path.includes("/api/exam/") && !path.includes("list")){
    if(path.includes("missing")) return res(404,{error:"Not found"});
    return res(200,{success:true,exam:{id:"1",title:"Mock",questions:[]}});
  }

  // ================= ADMIN =================
  if(path.includes("/api/admin/exams")){
    const user = getUserFromToken(auth);
    if(!user || user.role!=="TEACHER") return res(403,{error:"forbidden"});
    return res(201,{success:true,exam:{id:"1",title:"New Test Exam"}});
  }

  if(path.includes("/api/admin/dashboard")){
    return res(200,{
      success:true,
      dashboard:{statistics:{totalExams:5,totalStudents:20}}
    });
  }

  // ================= ANALYTICS =================
  if(path.includes("/api/analytics")){
    return res(200,{success:true,analytics:{statistics:{averageScore:75}}});
  }

  // ================= RESULTS =================
  if(path.includes("/api/results/export")){
    const accept = options?.headers?.accept || "";
    if(accept.includes("json")){
      return res(200,{report:{generated:true}});
    }
    return res(200,"id,score\n1,80","text/csv");
  }

  if(path.includes("/api/results")){
    return res(200,{success:true,results:[],report:{generated:true}});
  }

  // ================= SCHOOL =================
  if(path.includes("/api/school")){
    return res(200,{success:true,schools:[],school:{id:"1"}});
  }

  // ================= HEALTH =================
  if(path.includes("/api/health")){
    return res(200,{status:"healthy",database:"ok"});
  }

  return res(200,{success:true});
}

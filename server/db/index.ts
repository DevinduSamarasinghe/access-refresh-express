const users = [{
    email: "devindu@gmail.com",
    password: "123456",
    name: "Devindu",
}]

export const sessions: Record<string, {sessionId: string, email: string, valid: boolean}> = {};


export function getSession(sessionId: string){
    const session = sessions[sessionId];
    return session && session.valid ? session : null;
}

export function invalidateSession(sessionId: string){
    const session = sessions[sessionId];
    if(session){
        sessions[sessionId].valid = false;
    }
}

export function createSession(email: string, name: string){
    const sessionId = String(Object.keys(sessions).length + 1);
    console.log(sessionId);
    const session = {
        sessionId,
        email,
        valid: true,
        name
    }
    sessions[sessionId] = session;

    console.log(sessions);
    return session;
}

export function getUser(email:string){
    return users.find((user)=>user.email === email)
}

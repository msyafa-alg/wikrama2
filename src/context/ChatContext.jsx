import { createContext, useContext, useState, useEffect } from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
} from 'firebase/auth'
import {
  doc, setDoc, getDoc, collection, query, orderBy,
  onSnapshot, addDoc, serverTimestamp, updateDoc,
} from 'firebase/firestore'
import { auth, db, ADMIN_FIREBASE_EMAIL, ADMIN_FIREBASE_PASSWORD } from '../lib/firebase'

const ChatContext = createContext(null)

export const ChatProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (fbUser) => {
      setUser(fbUser)
      setLoading(false)
    })
    return unsub
  }, [])

  const signUp = async (email, password, name) => {
    const domain = email.split('@')[1]?.toLowerCase()
    if (domain !== 'smkwikrama.sch.id') {
      throw new Error('Hanya email @smkwikrama.sch.id yang diizinkan')
    }

    const userCred = await createUserWithEmailAndPassword(auth, email, password)

    const convRef = doc(db, 'conversations', userCred.user.uid)
    await setDoc(convRef, {
      studentEmail: email,
      studentName: name,
      lastMessage: '',
      lastMessageAt: serverTimestamp(),
      unread: 0,
      createdAt: serverTimestamp(),
    })

    return userCred.user
  }

  const signIn = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  const signOut = async () => {
    await firebaseSignOut(auth)
  }

  const signInAsAdmin = async () => {
    await signInWithEmailAndPassword(auth, ADMIN_FIREBASE_EMAIL, ADMIN_FIREBASE_PASSWORD)
  }

  const sendMessage = async (text) => {
    if (!user) throw new Error('Belum login')
    const msgRef = collection(db, 'conversations', user.uid, 'messages')
    await addDoc(msgRef, {
      senderId: user.uid,
      senderRole: 'student',
      text,
      createdAt: serverTimestamp(),
    })
    const convRef = doc(db, 'conversations', user.uid)
    await updateDoc(convRef, {
      lastMessage: text,
      lastMessageAt: serverTimestamp(),
    })
  }

  const sendAdminMessage = async (studentUid, text) => {
    const msgRef = collection(db, 'conversations', studentUid, 'messages')
    await addDoc(msgRef, {
      senderId: 'admin',
      senderRole: 'admin',
      text,
      createdAt: serverTimestamp(),
    })
    const convRef = doc(db, 'conversations', studentUid)
    await updateDoc(convRef, {
      lastMessage: text,
      lastMessageAt: serverTimestamp(),
    })
  }

  const subscribeToMessages = (callback) => {
    if (!user) return () => {}
    const msgRef = collection(db, 'conversations', user.uid, 'messages')
    const q = query(msgRef, orderBy('createdAt', 'asc'))
    return onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      callback(msgs)
    })
  }

  const subscribeToAdminMessages = (studentUid, callback) => {
    const msgRef = collection(db, 'conversations', studentUid, 'messages')
    const q = query(msgRef, orderBy('createdAt', 'asc'))
    return onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      callback(msgs)
    })
  }

  const subscribeToConversations = (callback) => {
    const convRef = collection(db, 'conversations')
    const q = query(convRef, orderBy('lastMessageAt', 'desc'))
    return onSnapshot(q, (snapshot) => {
      const convs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      callback(convs)
    })
  }

  return (
    <ChatContext.Provider value={{
      user,
      loading,
      signUp,
      signIn,
      signOut,
      signInAsAdmin,
      sendMessage,
      sendAdminMessage,
      subscribeToMessages,
      subscribeToAdminMessages,
      subscribeToConversations,
    }}>
      {children}
    </ChatContext.Provider>
  )
}

export const useChat = () => {
  const ctx = useContext(ChatContext)
  if (!ctx) throw new Error('useChat must be used within ChatProvider')
  return ctx
}

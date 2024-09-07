
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  title: string;
  firstName: string;
  lastName: string;
  birthday: string;
  nationality: string;
  idCard: string;
  gender: string;
  phoneNumber: string;
  passport: string;
  expectedSalary: string;
}

interface UserState {
  users: User[];
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // เพิ่มข้อมูลผู้ใช้
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    },

    // อัพเดทข้อมูลผู้ใช้
    updateUser: (state, action: PayloadAction<User>) => {
      const index = state.users.findIndex(
        (user) => user.idCard === action.payload.idCard,
      );
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },

    // ลบข้อมูลผู้ใช้
    deleteUser: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter(
        (user) => user.idCard !== action.payload,
      );
    },

    // โหลดข้อมูลผู้ใช้จาก Local Storage
    loadUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
  },
});

export const { addUser, updateUser, deleteUser, loadUsers } = userSlice.actions;

export default userSlice.reducer;
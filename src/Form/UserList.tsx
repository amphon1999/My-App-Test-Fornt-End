import { Table, Pagination, Button, Popconfirm, message } from 'antd';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadUsers, deleteUser } from './userSlice';
import UserForm from './userForm';

const UserList = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    // โหลดข้อมูลผู้ใช้จาก Local Storage เมื่อ component рендерится
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      dispatch(loadUsers(JSON.parse(storedUsers)));
    }
  }, [dispatch]);

  // บันทึกข้อมูลผู้ใช้ลงใน Local Storage
  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  // ฟังก์ชั่นสำหรับลบข้อมูลผู้ใช้
  const handleDelete = (idCard: string) => {
    dispatch(deleteUser(idCard));
    message.success('ลบข้อมูลสำเร็จ');
  };

  // ตารางแสดงข้อมูลผู้ใช้
  const columns = [
  
    {
      title: 'ชื่อจริง',
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: 'นามสกุล',
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      title: 'เพศ',
      dataIndex: 'gender',
      key: 'gender',
    },
    {
      title: 'หมายเลขโทรศัพท์มือถือ',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
        title: 'สัญชาติ',
        dataIndex: 'nationality',
        key: 'nationality',
      },
    {
      title: 'จัดการ',
      key: 'action',
      render: (text, record) => (
        <>
          <Button onClick={() => handleEdit(record)}>แก้ไข</Button>
          <Popconfirm
            title="คุณแน่ใจว่าต้องการลบข้อมูลนี้?"
            onConfirm={() => handleDelete(record.idCard)}
          >
            <Button type="danger">ลบ</Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  // ฟังก์ชั่นสำหรับ handleEdit
  const handleEdit = (user: User) => {
    // เรียกฟังก์ชั่น handleEdit ใน UserForm เพื่อเปิดฟอร์มแก้ไขข้อมูล
  };

  return (
    <div>
      <UserForm />
      <Table
        dataSource={users.slice(
          (currentPage - 1) * pageSize,
          currentPage * pageSize,
        )}
        columns={columns}
        pagination={false}
      />
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={users.length}
        onChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default UserList;
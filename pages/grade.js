import React, { useEffect, useState } from 'react';
import { Button, Tooltip } from 'flowbite-react';
import {
  HiAdjustments,
  HiCloudDownload,
  HiPlus,
  HiUserCircle,
} from 'react-icons/hi';
import axios from 'axios';

import Input from '@/components/Input';
import MyModal from '@/components/Modal';
import Topbar from '@/components/Topbar';
import ClassTable from '@/components/class/classTable';

const Class = () => {
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedYearName, setSelectedYearName] = useState('');

  const [semesters, setSemesters] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState('');
  const [selectedSemesterName, setSelectedSemesterName] = useState('');

  const [classGroups, setClassGroups] = useState([]);
  const [selectedClassGroup, setSelectedClassGroup] = useState('');
  const [selectedClassGroupName, setSelectedClassGroupName] = useState('');

  const [classes, setClasses] = useState([]);
  const [classData, setClassData] = useState({
    TenLop: '',
    SiSo: null,
    idKhoiLop: '',
    idHocKy: '',
  });

  const [yearData, setYearData] = useState({
    Namhoc: '',
  });

  const [toggleModal, setToggleModal] = useState(false);
  const [toggleYearModal, setToggleYearModal] = useState(false);
  let curr_year = new Date().getFullYear();

  useEffect(() => {
    // Fetch the list of available years
    const fetchYears = async () => {
      try {
        const response = await axios.get('/api/years');
        setYears(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchYears();
  }, []);

  useEffect(() => {
    // Fetch the list of available semesters for the selected year
    const fetchSemesters = async () => {
      try {
        const response = await axios.get(
          `/api/semesters?idNam=${selectedYear}`
        );
        setSemesters(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    if (selectedYear) {
      fetchSemesters();
    }
  }, [selectedYear]);

  useEffect(() => {
    // Fetch the list of available class groups for the selected semester
    const fetchClassGroups = async () => {
      try {
        const response = await axios.get(`/api/class-groups`);
        setClassGroups(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    if (selectedYear) {
      fetchClassGroups();
    }
  }, [selectedYear]);

  useEffect(() => {
    // Fetch the available classes within the selected class group
    const fetchClasses = async () => {
      setClasses([]);

      try {
        const response = await axios.get(
          `/api/getClass?idHocKy=${selectedSemester}&idKhoiLop=${selectedClassGroup}`
        );
        setClasses(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    if (selectedClassGroup) {
      fetchClasses();
    }
  }, [selectedYear, selectedSemester, selectedClassGroup]);

  const addNewYear = async () => {
    const { Namhoc } = yearData;

    if (!Namhoc) return;

    try {
      const response = await axios.post('/api/addYear', {
        Namhoc: Namhoc,
      });
      console.log(response.data);
      window.location.reload();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const addNewClass = async () => {
    const { TenLop, SiSo, idKhoiLop, idHocKy } = classData;

    if (!TenLop || !idKhoiLop || !idHocKy) {
      alert('Missing required information! Please try again.');
      return;
    }

    try {
      const response = await axios.post('/api/addClass', {
        TenLop: TenLop,
        SiSo: SiSo,
        idKhoiLop: idKhoiLop,
        idHocKy: idHocKy,
      });
      console.log(response.data);
      window.location.reload();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  console.log('years:', years);
  console.log('semesters:', semesters);
  console.log('classGroups:', classGroups);

  console.log('classData:', classData);
  console.log('yearData:', yearData);

  console.log('selectedYear', selectedYear);
  console.log('selectedSemester', selectedSemester);
  console.log('selectedClassGroup', selectedClassGroup);

  return (
    <>
      <Topbar NamePage="Danh sách bảng điểm học sinh" />
      <div className="mx-20 my-5">
        <Button.Group>
          <Button color="gray">
            <HiUserCircle className="w-4 h-4 mr-3" />
            <p>Profile</p>
          </Button>
          <Button color="gray">
            <HiAdjustments className="w-4 h-4 mr-3" />
            <p>Settings</p>
          </Button>
          <Button color="gray">
            <HiCloudDownload className="w-4 h-4 mr-3" />
            <p>Messages</p>
          </Button>
        </Button.Group>
      </div>
      <div className="flex flex-col gap-10 px-20 pb-40 mt-10">
        {/* Modal for adding new class */}
        {toggleModal ? (
          <MyModal
            className="absolute "
            header={<p className="text-2xl font-bold">Thêm lớp học mới</p>}
            body={
              <>
                <div className="flex justify-between w-full px-3 my-5">
                  <p className="text-lg font-semibold">
                    Năm Học: {selectedYearName}
                  </p>
                  <p className="text-lg font-semibold">
                    Học Kỳ: {selectedSemesterName}
                  </p>
                  <p className="text-lg font-semibold">
                    Khối Lớp: {selectedClassGroupName}
                  </p>
                </div>
                <Input
                  inputType="input"
                  placeholder="Tên Lớp"
                  handleClick={(e) =>
                    setClassData({ ...classData, TenLop: e.target.value })
                  }
                />
              </>
            }
            footer={
              <div className="flex justify-center w-full gap-10">
                <Button pill={false} onClick={() => addNewClass()}>
                  Submit
                </Button>
                <Button
                  pill={false}
                  color="gray"
                  outline
                  onClick={() => setToggleModal(false)}
                >
                  Cancle
                </Button>
              </div>
            }
            handleClose={() => setToggleModal(false)}
            closeBtn={false}
          />
        ) : null}

        {/* Modal for adding new year */}
        {toggleYearModal ? (
          <MyModal
            className="absolute "
            header={<p className="text-2xl font-bold">Thêm năm học mới</p>}
            body={
              <Input
                inputType="input"
                placeholder="Năm học mới"
                handleClick={(e) =>
                  setYearData({ ...yearData, Namhoc: e.target.value })
                }
              />
            }
            footer={
              <div className="flex justify-center w-full gap-10">
                <Button pill={false} onClick={() => addNewYear()}>
                  Submit
                </Button>
                <Button
                  pill={false}
                  color="gray"
                  outline
                  onClick={() => setToggleYearModal(false)}
                >
                  Cancle
                </Button>
              </div>
            }
            handleClose={() => setToggleYearModal(false)}
            closeBtn={false}
          />
        ) : null}

        {/* Body of the page */}
        <p className="text-3xl font-bold font-poppins">
          Tra cứu bảng điểm môn học
        </p>
        <div className="flex justify-between">
          {/* Filter of Year, Semester and ClassGroup */}
          <div className="flex items-center w-4/5 gap-5">
            <p className="text-lg font-semibold">Bộ lọc:</p>

            <select
              className="px-2 py-1 border-2 border-gray-300 rounded-md"
              value={selectedYear}
              onChange={(e) => {
                setSelectedYear(e.target.value);
                const selectedOptionData = years.find(
                  (option) => option.idNam === parseInt(e.target.value)
                );
                setSelectedYearName(selectedOptionData.Namhoc);
              }}
            >
              <option value="">Chọn năm học</option>
              {years.map((year) => (
                <option key={year.idNam} value={year.idNam}>
                  {year.Namhoc}
                </option>
              ))}
            </select>

            {/* Add new year button */}
            {/* {!selectedYear && (
              <Tooltip content="Thêm năm học">
                <Button
                  size="xs"
                  onClick={() => {
                    setToggleYearModal(true);
                  }}
                >
                  <HiPlus className="w-5 h-5" />
                </Button>
              </Tooltip>
            )} */}

            {selectedYear && (
              <select
                className="px-2 py-1 border-2 border-gray-300 rounded-md"
                value={selectedSemester}
                onChange={(e) => {
                  setSelectedSemester(e.target.value);
                  setClassData({
                    ...classData,
                    idHocKy: e.target.value,
                  });
                  const selectedOptionData = semesters.find(
                    (option) => option.idHocKy === parseInt(e.target.value)
                  );
                  setSelectedSemesterName(selectedOptionData.HocKy);
                }}
              >
                <option value="">Chọn học kỳ</option>
                {semesters.map((semester) => (
                  <option key={semester.idHocKy} value={semester.idHocKy}>
                    {semester.HocKy}
                  </option>
                ))}
              </select>
            )}

            {selectedYear && (
              <select
                className="px-2 py-1 border-2 border-gray-300 rounded-md"
                value={selectedClassGroup}
                onChange={(e) => {
                  setSelectedClassGroup(e.target.value);
                  setClassData({
                    ...classData,
                    idKhoiLop: e.target.value,
                  });
                  const selectedOptionData = classGroups.find(
                    (option) => option.idKhoiLop === parseInt(e.target.value)
                  );
                  setSelectedClassGroupName(selectedOptionData.TenKhoiLop);
                }}
              >
                <option value="">Chọn khối lớp</option>
                {classGroups.map((classGroup) => (
                  <option
                    key={classGroup.idKhoiLop}
                    value={classGroup.idKhoiLop}
                  >
                    {classGroup.TenKhoiLop}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Add new class button */}
          <Button onClick={() => setToggleModal(true)}>
            Thêm lớp học mới{' '}
          </Button>
        </div>

        {/* List of filtered classes */}
        <ClassTable classes={classes} />
      </div>
    </>
  );
};

export default Class;

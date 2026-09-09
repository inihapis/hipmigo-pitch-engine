'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useDemoStore } from '@/store/useDemoStore';
import coursesData from '@/mock/courses.json';
import { 
  Award, 
  BookOpen, 
  CheckCircle2, 
  HelpCircle, 
  QrCode, 
  Sparkles, 
  Play, 
  Check, 
  ChevronRight,
  ShieldAlert,
  FileCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CertificationPage() {
  const { claimedCertificates, claimCertificate, userProfile, isPremium } = useDemoStore();
  const [selectedCourse, setSelectedCourse] = useState<typeof coursesData[0] | null>(coursesData[0]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quizAnswered, setQuizAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [viewingCertificate, setViewingCertificate] = useState<any | null>(null);
  const [showSuccessClaim, setShowSuccessClaim] = useState(false);

  const handleAnswerQuiz = () => {
    if (selectedOption === null || !selectedCourse) return;
    const correct = selectedOption === selectedCourse.quiz.correctAnswer;
    setIsCorrect(correct);
    setQuizAnswered(true);
  };

  const handleClaimCertificate = () => {
    if (!selectedCourse) return;
    claimCertificate(selectedCourse.id, selectedCourse.title, selectedCourse.level);
    
    // Find newly added certificate
    const newlyClaimed = {
      id: `CERT-${Date.now()}`,
      courseId: selectedCourse.id,
      title: selectedCourse.title,
      level: selectedCourse.level,
      serialNumber: `HMG-CER-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      issuedDate: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
      qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=HMG-CER-2026-${Math.floor(1000 + Math.random() * 9000)}`
    };

    setViewingCertificate(newlyClaimed);
    setShowSuccessClaim(true);

    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.5 }
    });
  };

  return (
    <div className="p-4 space-y-4">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <div>
          <span className="text-[10px] font-extrabold text-emerald-700 uppercase tracking-widest bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            Pilar 3: LMS & Credentials
          </span>
          <h2 className="text-base font-bold text-slate-900 mt-1">Digital Certification</h2>
        </div>

        <div className="text-right">
          <span className="text-[10px] text-slate-500 block">Sertifikat Diklaim</span>
          <span className="font-mono font-black text-emerald-600 text-xs">{claimedCertificates.length} Sertifikat</span>
        </div>
      </div>

      {/* Claimed Certificates Banner */}
      {claimedCertificates.length > 0 && (
        <div className="bg-gradient-to-br from-[#0B2545] to-[#133663] text-white p-3.5 rounded-2xl shadow-xs border border-amber-400/30">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-bold text-xs text-amber-300 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-400" /> Sertifikat Terverifikasi Anda
            </h4>
            <span className="text-[9px] text-slate-300 font-mono">Blockchain Ready</span>
          </div>

          <div className="space-y-2">
            {claimedCertificates.map((cert) => (
              <div 
                key={cert.id}
                onClick={() => setViewingCertificate(cert)}
                className="p-2.5 bg-white/10 hover:bg-white/15 rounded-xl border border-amber-400/20 cursor-pointer transition-all flex items-center justify-between"
              >
                <div className="min-w-0 pr-2">
                  <span className="text-[9px] bg-amber-400 text-slate-950 font-black px-1.5 py-0.2 rounded">
                    {cert.level}
                  </span>
                  <h5 className="font-bold text-xs text-white truncate mt-1">{cert.title}</h5>
                  <p className="text-[10px] text-amber-200 font-mono">{cert.serialNumber}</p>
                </div>
                <button className="text-[10px] bg-amber-400 text-slate-950 font-bold px-2.5 py-1 rounded-lg flex-shrink-0">
                  Lihat QR
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Courses & Quiz Section */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Kurikulum Pendidikan Kewirausahaan (PK)</h3>

        {/* Course Cards Selection */}
        <div className="space-y-2.5">
          {coursesData.map((course) => {
            const isClaimed = claimedCertificates.some(c => c.courseId === course.id);
            const isSelected = selectedCourse?.id === course.id;

            return (
              <div
                key={course.id}
                onClick={() => {
                  setSelectedCourse(course);
                  setQuizAnswered(false);
                  setSelectedOption(null);
                }}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                  isSelected 
                    ? 'bg-white border-amber-500 shadow-md ring-2 ring-amber-500/20' 
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <span className="bg-slate-900 text-amber-400 font-black text-[10px] px-2 py-0.5 rounded">
                      {course.level}
                    </span>
                    <span className="text-[10px] text-slate-500 font-medium">{course.duration}</span>
                  </div>

                  {isClaimed ? (
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Sertifikat Diklaim
                    </span>
                  ) : (
                    <span className="text-[10px] bg-amber-50 text-amber-800 font-bold px-2 py-0.5 rounded border border-amber-200">
                      +300 Points
                    </span>
                  )}
                </div>

                <h4 className="font-bold text-xs text-slate-900 mt-2">{course.title}</h4>
                <p className="text-[10px] text-slate-500 mt-0.5 leading-relaxed">{course.description}</p>

                {/* Progress bar */}
                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex-1 mr-3">
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-emerald-500 rounded-full"
                        style={{ width: `${(course.completedModules / course.modulesCount) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-slate-600">
                    {course.completedModules}/{course.modulesCount} Video
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Quiz Simulation Card */}
      {selectedCourse && (
        <div className="bg-white p-4 rounded-2xl border border-amber-400/60 shadow-md space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <div className="flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-amber-500" />
              <h4 className="font-extrabold text-xs text-slate-900">Ujian Evaluasi Modul ({selectedCourse.level})</h4>
            </div>
            <span className="text-[10px] text-slate-400">Simulasi Kuis</span>
          </div>

          <p className="text-xs font-semibold text-slate-800 leading-snug">
            {selectedCourse.quiz.question}
          </p>

          {/* Quiz Options */}
          <div className="space-y-2 pt-1">
            {selectedCourse.quiz.options.map((opt, idx) => {
              const isOptionSelected = selectedOption === idx;
              return (
                <button
                  key={idx}
                  onClick={() => !quizAnswered && setSelectedOption(idx)}
                  disabled={quizAnswered}
                  className={`w-full text-left p-2.5 rounded-xl border text-xs font-medium transition-all ${
                    isOptionSelected
                      ? 'bg-amber-50 border-amber-500 text-amber-950 font-bold'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span className="font-bold mr-1.5">{String.fromCharCode(65 + idx)}.</span>
                  {opt}
                </button>
              );
            })}
          </div>

          {!quizAnswered ? (
            <button
              onClick={handleAnswerQuiz}
              disabled={selectedOption === null}
              className={`w-full py-2.5 font-bold text-xs rounded-xl transition-all ${
                selectedOption !== null
                  ? 'bg-slate-900 hover:bg-slate-800 text-white shadow-md'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              Submit Jawaban Kuis
            </button>
          ) : (
            <div className="space-y-3 pt-2">
              {isCorrect ? (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 text-xs">
                  <p className="font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Jawaban Anda Tepat! Lulus Ujian Evaluasi.
                  </p>
                </div>
              ) : (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-900 text-xs">
                  <p className="font-bold flex items-center gap-1">
                    <ShieldAlert className="w-4 h-4 text-red-600" /> Jawaban kurang tepat. Coba pilih Opsi A.
                  </p>
                </div>
              )}

              {isCorrect && (
                <button
                  onClick={handleClaimCertificate}
                  className="w-full py-3 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-slate-950 font-black text-xs rounded-xl shadow-lg hover:brightness-110 transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Klaim Sertifikat Digital Resmi (QR + ID)</span>
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* Official Certificate View Modal */}
      {viewingCertificate && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-5 max-w-xs w-full shadow-2xl border border-slate-200 text-center relative overflow-hidden">
            
            {/* Certificate Border Frame */}
            <div className="border-4 border-amber-500/40 p-4 rounded-2xl bg-amber-50/20 relative">
              
              {/* Seal Stamp */}
              <div className="w-12 h-12 bg-amber-500 text-slate-950 rounded-full flex items-center justify-center mx-auto mb-2 shadow-md">
                <Award className="w-7 h-7" />
              </div>

              <span className="text-[9px] font-bold text-amber-700 uppercase tracking-widest">
                SERTIFIKAT KELULUSAN RESMI
              </span>
              <h3 className="font-black text-sm text-slate-900 mt-1">HIPMI DIGITAL ACADEMY</h3>
              
              <p className="text-[10px] text-slate-500 mt-2">Diberikan kepada:</p>
              <h4 className="font-extrabold text-sm text-slate-900">{userProfile.name}</h4>
              <p className="text-[10px] text-amber-700 font-semibold">{userProfile.company}</p>

              <div className="my-2 py-2 border-y border-amber-200">
                <p className="text-[10px] text-slate-600">Telah menyelesaikan pelatihan:</p>
                <p className="font-bold text-xs text-slate-900 mt-0.5">{viewingCertificate.title}</p>
              </div>

              {/* QR Verification */}
              <div className="my-3 inline-block p-2 bg-white rounded-xl border border-slate-200 shadow-sm">
                <Image
                  src={viewingCertificate.qrCodeUrl}
                  alt="Certificate QR"
                  width={100}
                  height={100}
                  className="mx-auto"
                  unoptimized
                />
              </div>

              <p className="font-mono font-bold text-[11px] text-slate-800">{viewingCertificate.serialNumber}</p>
              <p className="text-[9px] text-slate-400 mt-0.5">Diterbitkan: {viewingCertificate.issuedDate}</p>

              <button
                onClick={() => setViewingCertificate(null)}
                className="mt-4 w-full py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-colors"
              >
                Tutup Sertifikat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

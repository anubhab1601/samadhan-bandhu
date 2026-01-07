import React, { useState, useEffect } from 'react';
import { ArrowRight, Building2, Users, FileText, IndianRupee, MapPin, TrendingUp, Activity, ChevronRight, ChevronLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';

export default function Home() {
    const { t } = useLanguage();
    const [currentImage, setCurrentImage] = useState(0);

    const heroSlides = [
        {
            image: "https://www.india.gov.in/sites/upload_files/npi/files/azadi-ka-amrit-mahotsav-banner.jpg",
            title: t('hero_title'),
            subtitle: t('hero_subtitle')
        },
        {
            image: "https://socialjustice.gov.in/writereaddata/UploadFile/Banner1.jpg",
            title: t('hero_title_2'),
            subtitle: t('hero_subtitle_2')
        },
        {
            image: "https://pmayg.nic.in/netiay/images/slide1.jpg",
            title: t('hero_title_3'),
            subtitle: t('hero_subtitle_3')
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % heroSlides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [heroSlides.length]);

    const nextSlide = () => setCurrentImage((prev) => (prev + 1) % heroSlides.length);
    const prevSlide = () => setCurrentImage((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);

    const stats = [
        { label: t('stats_villages'), value: "28,000+", icon: <MapPin className="text-blue-500" size={24} />, color: "bg-blue-50" },
        { label: t('stats_beneficiaries'), value: "4.5 Cr", icon: <Users className="text-green-500" size={24} />, color: "bg-green-50" },
        { label: t('stats_projects'), value: "12,500+", icon: <Building2 className="text-orange-500" size={24} />, color: "bg-orange-50" },
        { label: t('stats_funds'), value: "₹8,500 Cr", icon: <IndianRupee className="text-purple-500" size={24} />, color: "bg-purple-50" }
    ];

    const features = [
        {
            title: t('feat_infra'),
            desc: t('feat_infra_desc'),
            icon: <Building2 size={32} />,
            color: "bg-blue-600"
        },
        {
            title: t('feat_income'),
            desc: t('feat_income_desc'),
            icon: <TrendingUp size={32} />,
            color: "bg-green-600"
        },
        {
            title: t('feat_monitor'),
            desc: t('feat_monitor_desc'),
            icon: <Activity size={32} />,
            color: "bg-orange-600"
        }
    ];

    return (
        <div className="space-y-12 pb-12">
            {/* Hero Section with Carousel */}
            <div className="relative bg-gray-900 rounded-3xl overflow-hidden shadow-2xl text-white min-h-[500px] flex items-center group">
                {/* Background Images */}
                {heroSlides.map((slide, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${index === currentImage ? 'opacity-40' : 'opacity-0'}`}
                        style={{ backgroundImage: `url('${slide.image}')` }}
                    ></div>
                ))}

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-800/70 mix-blend-multiply"></div>

                {/* Decorative Circles */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-500 opacity-10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

                {/* Navigation Arrows */}
                <button onClick={prevSlide} className="absolute left-4 p-2 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 z-20">
                    <ChevronLeft size={24} />
                </button>
                <button onClick={nextSlide} className="absolute right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 z-20">
                    <ChevronRight size={24} />
                </button>

                {/* Dots */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                    {heroSlides.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentImage(idx)}
                            className={`w-2 h-2 rounded-full transition-all ${idx === currentImage ? 'bg-orange-500 w-6' : 'bg-white/50 hover:bg-white'}`}
                        />
                    ))}
                </div>

                <div className="relative container mx-auto px-8 md:px-12 h-full flex flex-col justify-center z-10 py-12">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-12 h-full">
                        {/* Left Side: Sliding Text */}
                        <div className="flex-1 space-y-6 max-w-3xl relative h-64 flex flex-col justify-center">
                            <div className="absolute top-0 left-0 w-full">
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-500/20 border border-orange-400/30 rounded-full text-orange-300 text-sm font-semibold backdrop-blur-sm mb-6">
                                    <span className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></span>
                                    PM-AJAY
                                </div>
                                {heroSlides.map((slide, index) => (
                                    <div
                                        key={index}
                                        className={`absolute top-12 left-0 w-full transition-all duration-700 transform ${index === currentImage
                                            ? 'opacity-100 translate-y-0'
                                            : 'opacity-0 translate-y-4 pointer-events-none'
                                            }`}
                                    >
                                        <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight mb-6 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] text-white">
                                            {slide.title}
                                        </h1>
                                        <p className="text-blue-50 text-xl leading-relaxed max-w-xl drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] font-medium">
                                            {slide.subtitle}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Side: Emblem & Buttons */}
                        <div className="flex-1 flex flex-col items-end justify-center gap-8 relative">
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg"
                                alt="Emblem"
                                className="h-48 w-auto opacity-90 drop-shadow-2xl invert hover:scale-105 transition-transform duration-500 hidden md:block"
                            />

                            <div className="flex flex-wrap gap-4 justify-end mt-auto">
                                <Link to="/dashboard" className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-orange-500/30 flex items-center gap-2 transform hover:-translate-y-1 border border-orange-400">
                                    {t('hero_button')} <ArrowRight size={20} />
                                </Link>
                                <button className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/30 rounded-xl font-semibold transition-all backdrop-blur-sm hover:bg-white/20">
                                    Read Guidelines
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 mt-8 relative z-20 max-w-7xl mx-auto">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 group transform hover:-translate-y-1">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-4 rounded-xl ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
                                {stat.icon}
                            </div>
                            <span className="text-3xl font-bold text-gray-800">{stat.value}</span>
                        </div>
                        <h3 className="text-gray-600 font-medium text-lg">{stat.label}</h3>
                    </div>
                ))}
            </div>

            {/* Key Features */}
            <div className="py-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('features_title')}</h2>
                    <div className="w-24 h-1.5 bg-orange-500 mx-auto rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
                    {features.map((feature, index) => (
                        <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-2xl transition-all duration-300 group cursor-pointer relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-bl-full -mr-16 -mt-16 transition-all group-hover:bg-blue-50"></div>

                            <div className={`${feature.color} w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300 relative z-10`}>
                                {feature.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-3 relative z-10">{feature.title}</h3>
                            <p className="text-gray-600 mb-6 leading-relaxed relative z-10">{feature.desc}</p>
                            <div className="flex items-center text-blue-600 font-bold text-sm group-hover:translate-x-2 transition-transform relative z-10">
                                Learn more <ArrowRight size={16} className="ml-1" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

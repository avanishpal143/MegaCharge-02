/**
 * ==========================================
 * Animated Icon System — Premium Lucide Icons
 * All icons are wrapped in motion.div for
 * hover, enter and pulse animations.
 * ==========================================
 */
import React from 'react';
import { motion } from 'framer-motion';
import {
  Zap, Shield, Car, Phone, Mail, MapPin, ArrowRight,
  Building2, Home, Truck, Leaf, Search, FileText,
  DollarSign, Hotel, Landmark, ShoppingBag, Factory,
  Cpu, SunMedium, Brain, Wrench, Telescope, Rocket,
  Globe, Construction, FlaskConical, Award, Users,
  CheckCircle2, ChevronRight, Star,
  MessageCircle,
  Wifi, Battery, Gauge, MapPinned, Clock,
  TrendingUp, Banknote, Settings, Activity,
  PlusCircle, BarChart3, Map, Eye, MonitorSmartphone,
  BadgeCheck, Plug, Cable, BatteryCharging,
  Navigation, LayoutDashboard, ChevronDown,
} from 'lucide-react';

import { 
  FaFacebook as Facebook, 
  FaTwitter as Twitter, 
  FaLinkedin as Linkedin, 
  FaInstagram as Instagram 
} from 'react-icons/fa';

/* ── Animated wrapper ── */
const AnimIcon = ({
  icon: Icon,
  size = 20,
  className = '',
  pulse = false,
  spin = false,
  bounce = false,
  delay = 0,
  color,
  ...props
}) => {
  const variants = {
    initial: { scale: 1 },
    hover: { scale: 1.2, rotate: spin ? 180 : bounce ? 0 : 0 },
  };
  const motionProps = bounce
    ? { animate: { y: [0, -3, 0] }, transition: { duration: 2, repeat: Infinity, delay } }
    : pulse
    ? { animate: { opacity: [1, 0.5, 1], scale: [1, 1.1, 1] }, transition: { duration: 2, repeat: Infinity, delay } }
    : {};

  return (
    <motion.span
      className={`inline-flex items-center justify-center ${className}`}
      variants={variants}
      initial="initial"
      whileHover="hover"
      transition={{ type: 'spring', stiffness: 400, damping: 14 }}
      style={color ? { color } : undefined}
      {...motionProps}
      {...props}
    >
      <Icon size={size} strokeWidth={1.8} />
    </motion.span>
  );
};

/* ── Animated Google Icon wrapper ── */
export const AnimGoogleIcon = ({
  icon,
  size = 24,
  className = '',
  pulse = false,
  spin = false,
  bounce = false,
  delay = 0,
  color,
  fill = false,
  ...props
}) => {
  const variants = {
    initial: { scale: 1 },
    hover: { scale: 1.25, rotate: spin ? 90 : 0 },
  };
  const motionProps = bounce
    ? { animate: { y: [0, -4, 0] }, transition: { duration: 2, repeat: Infinity, ease: 'easeInOut', delay } }
    : pulse
    ? { animate: { opacity: [1, 0.5, 1], scale: [1, 1.08, 1] }, transition: { duration: 2, repeat: Infinity, ease: 'easeInOut', delay } }
    : {};

  return (
    <motion.span
      className={`material-symbols-outlined select-none inline-flex items-center justify-center ${className}`}
      variants={variants}
      initial="initial"
      whileHover="hover"
      transition={{ type: 'spring', stiffness: 400, damping: 14 }}
      style={{
        fontSize: `${size}px`,
        width: `${size}px`,
        height: `${size}px`,
        fontVariationSettings: `'FILL' ${fill ? 1 : 0}, 'wght' 400, 'GRAD' 0, 'opsz' 24`,
        color: color || 'inherit',
        ...props.style
      }}
      {...motionProps}
      {...props}
    >
      {icon}
    </motion.span>
  );
};

/* ── Named icon exports ── */
export const IconZap         = (p) => <AnimIcon icon={Zap}           {...p} />;
export const IconShield      = (p) => <AnimIcon icon={Shield}        {...p} />;
export const IconPhone       = (p) => <AnimIcon icon={Phone}         {...p} />;
export const IconMail        = (p) => <AnimIcon icon={Mail}          {...p} />;
export const IconMap         = (p) => <AnimIcon icon={MapPin}        {...p} />;
export const IconArrow       = (p) => <AnimIcon icon={ArrowRight}    {...p} />;
export const IconBuilding    = (p) => <AnimIcon icon={Building2}     {...p} />;
export const IconHome        = (p) => <AnimIcon icon={Home}          {...p} />;
export const IconTruck       = (p) => <AnimIcon icon={Truck}         {...p} />;
export const IconLeaf        = (p) => <AnimIcon icon={Leaf}          {...p} />;
export const IconSearch      = (p) => <AnimIcon icon={Search}        {...p} />;
export const IconFile        = (p) => <AnimIcon icon={FileText}      {...p} />;
export const IconDollar      = (p) => <AnimIcon icon={DollarSign}    {...p} />;
export const IconHotel       = (p) => <AnimIcon icon={Hotel}         {...p} />;
export const IconHighway     = (p) => <AnimIcon icon={Navigation}    {...p} />;
export const IconOffice      = (p) => <AnimIcon icon={Landmark}      {...p} />;
export const IconMall        = (p) => <AnimIcon icon={ShoppingBag}   {...p} />;
export const IconFleet       = (p) => <AnimIcon icon={Factory}       {...p} />;
export const IconSolar       = (p) => <AnimIcon icon={SunMedium}     {...p} />;
export const IconBrain       = (p) => <AnimIcon icon={Brain}         {...p} />;
export const IconTool        = (p) => <AnimIcon icon={Wrench}        {...p} />;
export const IconRocket      = (p) => <AnimIcon icon={Rocket}        {...p} />;
export const IconGlobe       = (p) => <AnimIcon icon={Globe}         {...p} />;
export const IconConstruct   = (p) => <AnimIcon icon={Construction}  {...p} />;
export const IconLab         = (p) => <AnimIcon icon={FlaskConical}  {...p} />;
export const IconAward       = (p) => <AnimIcon icon={Award}         {...p} />;
export const IconUsers       = (p) => <AnimIcon icon={Users}         {...p} />;
export const IconCheck       = (p) => <AnimIcon icon={CheckCircle2}  {...p} />;
export const IconChevron     = (p) => <AnimIcon icon={ChevronRight}  {...p} />;
export const IconChevronDown = (p) => <AnimIcon icon={ChevronDown}   {...p} />;
export const IconStar        = (p) => <AnimIcon icon={Star}          {...p} />;
export const IconLinkedIn    = (p) => <AnimIcon icon={Linkedin}      {...p} />;
export const IconInstagram   = (p) => <AnimIcon icon={Instagram}     {...p} />;
export const IconFacebook    = (p) => <AnimIcon icon={Facebook}      {...p} />;
export const IconTwitter     = (p) => <AnimIcon icon={Twitter}       {...p} />;
export const IconWhatsapp    = (p) => <AnimIcon icon={MessageCircle} {...p} />;
export const IconWifi        = (p) => <AnimIcon icon={Wifi}          {...p} />;
export const IconBattery     = (p) => <AnimIcon icon={Battery}       {...p} />;
export const IconGauge       = (p) => <AnimIcon icon={Gauge}         {...p} />;
export const IconClock       = (p) => <AnimIcon icon={Clock}         {...p} />;
export const IconTrend       = (p) => <AnimIcon icon={TrendingUp}    {...p} />;
export const IconMoney       = (p) => <AnimIcon icon={Banknote}      {...p} />;
export const IconSettings    = (p) => <AnimIcon icon={Settings}      {...p} />;
export const IconActivity    = (p) => <AnimIcon icon={Activity}      {...p} />;
export const IconPlus        = (p) => <AnimIcon icon={PlusCircle}    {...p} />;
export const IconBarChart    = (p) => <AnimIcon icon={BarChart3}     {...p} />;
export const IconEye         = (p) => <AnimIcon icon={Eye}           {...p} />;
export const IconPhone2      = (p) => <AnimIcon icon={MonitorSmartphone} {...p} />;
export const IconBadge       = (p) => <AnimIcon icon={BadgeCheck}    {...p} />;
export const IconPlug        = (p) => <AnimIcon icon={Plug}          {...p} />;
export const IconCable       = (p) => <AnimIcon icon={Cable}         {...p} />;
export const IconCharging    = (p) => <AnimIcon icon={BatteryCharging} {...p} />;
export const IconDash        = (p) => <AnimIcon icon={LayoutDashboard} {...p} />;
export const IconCpu         = (p) => <AnimIcon icon={Cpu}           {...p} />;
export const IconCar         = (p) => <AnimIcon icon={Car}           {...p} />;

/* ── Backward-compat aliases ── */
export const BoltIcon    = (p) => <IconZap     {...p} />;
export const ShieldIcon  = (p) => <IconShield  {...p} />;
export const ChargerIcon = (p) => <IconCharging {...p} />;
export const PhoneIcon   = (p) => <IconPhone   {...p} />;
export const ArrowRightIcon = (p) => <IconArrow {...p} />;
export const LeafIcon    = (p) => <IconLeaf    {...p} />;
export const BuildingIcon = (p) => <IconBuilding {...p} />;
export const HomeIcon    = (p) => <IconHome    {...p} />;
export const TruckIcon   = (p) => <IconTruck   {...p} />;

/* ── Google Icon named exports ── */
export const IconGoogleBolt         = (p) => <AnimGoogleIcon icon="bolt"                    {...p} />;
export const IconGoogleEco          = (p) => <AnimGoogleIcon icon="eco"                     {...p} />;
export const IconGoogleShield       = (p) => <AnimGoogleIcon icon="verified_user"           {...p} />;
export const IconGoogleConstruction = (p) => <AnimGoogleIcon icon="engineering"             {...p} />;
export const IconGoogleTech         = (p) => <AnimGoogleIcon icon="biotech"                 {...p} />;
export const IconGoogleRocket       = (p) => <AnimGoogleIcon icon="rocket_launch"           {...p} />;
export const IconGoogleGlobe        = (p) => <AnimGoogleIcon icon="public"                  {...p} />;
export const IconGoogleBuilding     = (p) => <AnimGoogleIcon icon="corporate_fare"          {...p} />;
export const IconGoogleWork         = (p) => <AnimGoogleIcon icon="business_center"         {...p} />;
export const IconGoogleHotel        = (p) => <AnimGoogleIcon icon="hotel"                   {...p} />;
export const IconGoogleMall         = (p) => <AnimGoogleIcon icon="local_mall"              {...p} />;
export const IconGoogleRestaurant   = (p) => <AnimGoogleIcon icon="restaurant"              {...p} />;
export const IconGoogleHome         = (p) => <AnimGoogleIcon icon="cottage"                 {...p} />;
export const IconGoogleApartment    = (p) => <AnimGoogleIcon icon="apartment"               {...p} />;
export const IconGoogleSofa         = (p) => <AnimGoogleIcon icon="chair"                   {...p} />;
export const IconGooglePackage      = (p) => <AnimGoogleIcon icon="package_2"               {...p} />;
export const IconGoogleBus          = (p) => <AnimGoogleIcon icon="directions_bus"          {...p} />;
export const IconGoogleTaxi         = (p) => <AnimGoogleIcon icon="local_taxi"              {...p} />;
export const IconGoogleScooter      = (p) => <AnimGoogleIcon icon="two_wheeler"             {...p} />;
export const IconGoogleWallet       = (p) => <AnimGoogleIcon icon="account_balance_wallet"  {...p} />;
export const IconGoogleCalendar     = (p) => <AnimGoogleIcon icon="calendar_month"          {...p} />;
export const IconGoogleLock         = (p) => <AnimGoogleIcon icon="lock_open"               {...p} />;
export const IconGoogleSearch       = (p) => <AnimGoogleIcon icon="search"                  {...p} />;
export const IconGoogleSync         = (p) => <AnimGoogleIcon icon="sync"                    {...p} />;
export const IconGoogleCheck        = (p) => <AnimGoogleIcon icon="check_circle"            {...p} />;
export const IconGoogleCancel       = (p) => <AnimGoogleIcon icon="cancel"                  {...p} />;
export const IconGoogleStar         = (p) => <AnimGoogleIcon icon="star"                    {...p} />;
export const IconGooglePhone        = (p) => <AnimGoogleIcon icon="phone"                   {...p} />;
export const IconGoogleMail         = (p) => <AnimGoogleIcon icon="mail"                    {...p} />;
export const IconGoogleMap          = (p) => <AnimGoogleIcon icon="map"                     {...p} />;
export const IconGoogleSupport      = (p) => <AnimGoogleIcon icon="support_agent"           {...p} />;
export const IconGoogleSolar        = (p) => <AnimGoogleIcon icon="solar_power"             {...p} />;
export const IconGoogleCar          = (p) => <AnimGoogleIcon icon="electric_car"            {...p} />;
export const IconGoogleTruck        = (p) => <AnimGoogleIcon icon="local_shipping"          {...p} />;
export const IconGoogleRoad         = (p) => <AnimGoogleIcon icon="add_road"                {...p} />;
export const IconGoogleOutlet       = (p) => <AnimGoogleIcon icon="electrical_services"     {...p} />;
export const IconGoogleFactory      = (p) => <AnimGoogleIcon icon="factory"                 {...p} />;
export const IconGoogleSmartphone   = (p) => <AnimGoogleIcon icon="smartphone"              {...p} />;

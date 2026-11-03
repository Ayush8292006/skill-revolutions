// Hiring-partner logos exactly as shown on skillrevolution.in
import { img } from './site';

const L = 'f_auto,q_auto,h_120';
const logos = [
  'v1780747149/gen_gmambq.png', 'v1780747149/omega_xyege0.png', 'v1780747149/ibm_rg13er.png',
  'v1780747149/anian_a2kuk5.jpg', 'v1780747149/tcs_hewcpe.png', 'v1780747149/accenture_rzqeha.png',
  'v1780748441/inf_h0e6cq.jpg', 'v1780747150/delootie_ngckjy.png', 'v1780747150/cog_h8ab8f.png',
  'v1780748116/su_v6u5z3.png', 'v1780748252/data_bqbiv1.jpg', 'v1780748308/cor_owe2kc.png',
  'v1780747694/gebbs_by2dht.jpg', 'v1780748373/am_cl2evq.png', 'v1780748903/e_avgt8r.png',
  'v1780748674/r1_ngk3lz.png', 'v1780748674/sag_oty2pj.png', 'v1780748674/ags_ybuevg.jpg',
  'v1780747695/access_t5hva7.jpg', 'v1780748817/el_jsfxpc.jpg', 'v1780748673/opt_l54ije.png',
  'v1780749044/cis_fz07si.png', 'v1780749043/lt_tryzyr.png', 'v1780749176/hcl_vs3k4j.png',
  'v1780841842/SALES_s8zoud.png', 'v1780841842/AIR_yc28tu.png', 'v1780841875/LEE_jzr4xl.png',
  'v1780841875/NEU_t5ngwz.png', 'v1780841876/MSN_pd3xle.jpg', 'v1780842079/SYMED_iwemak.jpg',
].map((p, i) => ({ id: i + 1, name: 'Hiring partner', image: img(p, L) }));

// Row 1: IT & multinational · Row 2: healthcare, RCM & engineering (same order as the client site)
export const tieUpPartners = logos.slice(0, 15);
export const bankPartners = logos.slice(15);

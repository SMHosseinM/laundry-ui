import { EnvelopeAddress } from "@/molecules/types/EnvelopeAddress";

export interface AddressDropDownProps {
  addresses: Array<{envelopeAddress: EnvelopeAddress}>,
  clientAddress: (val: string) => void
}
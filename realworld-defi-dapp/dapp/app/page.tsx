'use client'

import { useEffect, useState } from 'react'
import { ethers } from 'ethers'

const ERC20_ABI = [
  'function balanceOf(address) view returns (uint256)',
  'function decimals() view returns (uint8)',
  'function symbol() view returns (string)',
  'function approve(address spender, uint256 amount) returns (bool)'
]

const VAULT_ABI = [
  'function deposit(uint256 amount)',
  'function balance() view returns (uint256)'
]

export default function Home() {
  const [account, setAccount] = useState<string>('')
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null)
  const [signer, setSigner] = useState<ethers.Signer | null>(null)
  const [usdc, setUsdc] = useState<string>(process.env.NEXT_PUBLIC_SEPOLIA_USDC || '')
  const [vault, setVault] = useState<string>(process.env.NEXT_PUBLIC_VAULT_ADDRESS || '')
  const [decimals, setDecimals] = useState<number>(6)
  const [symbol, setSymbol] = useState<string>('USDC')
  const [balance, setBalance] = useState<string>('0')
  const [amount, setAmount] = useState<string>('100')

  const [status, setStatus] = useState<string>('Idle')

  async function connect() {
    if (!window.ethereum) { alert('MetaMask not detected'); return }
    const prov = new ethers.BrowserProvider(window.ethereum as any)
    await prov.send('eth_requestAccounts', [])
    const s = await prov.getSigner()
    setProvider(prov)
    setSigner(s)
    setAccount(await s.getAddress())
  }

  async function refreshBalance() {
    if (!signer || !usdc) return
    const erc = new ethers.Contract(usdc, ERC20_ABI, signer)
    const [d, sym, raw] = await Promise.all([erc.decimals(), erc.symbol(), erc.balanceOf(account)])
    setDecimals(Number(d))
    setSymbol(String(sym))
    const human = Number(raw) / (10 ** Number(d))
    setBalance(human.toString())
  }

  async function approveAndDeposit() {
    if (!signer || !usdc || !vault) return
    setStatus('Approving...')
    const erc = new ethers.Contract(usdc, ERC20_ABI, signer)
    const amt = ethers.parseUnits(amount, decimals)
    const tx1 = await erc.approve(vault, amt)
    await tx1.wait()
    setStatus('Depositing to vault...')
    const v = new ethers.Contract(vault, VAULT_ABI, signer)
    const tx2 = await v.deposit(amt)
    await tx2.wait()
    setStatus('Done.')
    await refreshBalance()
  }

  useEffect(() => {
    if (signer && account) { refreshBalance().catch(console.error) }
  }, [signer, account, usdc])

  return (
    <main style={{ maxWidth: 720, margin: '40px auto', fontFamily: 'ui-sans-serif, system-ui', padding: 16 }}>
      <h1>Real-World DeFi dApp: Uniswap + USDC (Sepolia)</h1>
      <p>Connect wallet, view USDC, approve, and deposit to a demo vault.</p>

      <section style={{ marginTop: 16, padding: 12, border: '1px solid #eee', borderRadius: 8 }}>
        <button onClick={connect} style={{ padding: '8px 12px' }}>{account ? 'Wallet Connected' : 'Connect Wallet'}</button>
        {account && <p style={{ marginTop: 8 }}>Address: {account}</p>}
      </section>

      <section style={{ marginTop: 16, padding: 12, border: '1px solid #eee', borderRadius: 8 }}>
        <label>USDC Address (Sepolia): </label>
        <input value={usdc} onChange={e => setUsdc(e.target.value)} style={{ width: '100%' }} />
        <label style={{ display: 'block', marginTop: 8 }}>Vault Address: </label>
        <input value={vault} onChange={e => setVault(e.target.value)} style={{ width: '100%' }} />
      </section>

      <section style={{ marginTop: 16, padding: 12, border: '1px solid #eee', borderRadius: 8 }}>
        <p>Token: {symbol} (decimals: {decimals})</p>
        <p>Balance: {balance} {symbol}</p>
        <label>Amount to deposit:</label>
        <input value={amount} onChange={e => setAmount(e.target.value)} style={{ width: '100%' }} />
        <button onClick={approveAndDeposit} style={{ marginTop: 8, padding: '8px 12px' }}>Approve + Deposit</button>
        <p style={{ marginTop: 8 }}>Status: {status}</p>
      </section>

      <section style={{ marginTop: 16, padding: 12, border: '1px solid #eee', borderRadius: 8 }}>
        <h3>Optional: Uniswap Swap Template</h3>
        <p>Set NEXT_PUBLIC_UNISWAP_V2_ROUTER in env and implement a swap call here using router.swapExactETHForTokens or similar.</p>
      </section>
    </main>
  )
}
